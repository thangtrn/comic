import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as cheerio from 'cheerio';
import { Model, Types } from 'mongoose';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

import crawlApi from './axios/crawl-api';
import { CrawlComicDto, CrawlGenresDto } from './dtos/crawl.dto';
import { Genres } from '~/schemas/genres.schema';
import { Comic } from '~/schemas/comic.schema';
import { Author } from '~/schemas/author.schema';
import * as path from 'path';
import { Folder } from '~/schemas/folder.schema';
import { Media } from '~/schemas/media.schema';
import { CrawlAuthor } from './types/crawl';
import { Chapter } from '~/schemas/chapter.schema';

@Injectable()
export class CrawlService {
  private readonly logger = new Logger(CrawlService.name);

  constructor(
    @InjectModel(Genres.name) private genresModel: Model<Genres>,
    @InjectModel(Author.name) private authorModel: Model<Author>,
    @InjectModel(Comic.name) private comicModel: Model<Comic>,
    @InjectModel(Folder.name) private folderModel: Model<Folder>,
    @InjectModel(Media.name) private mediaModel: Model<Media>,
    @InjectModel(Chapter.name) private chapterModel: Model<Chapter>,
    @InjectQueue('genres-queue') private genresQueue: Queue,
    @InjectQueue('comic-queue') private comicQueue: Queue,
  ) {}

  // #region Genres
  async crawlGenres(crawlGenresDto: CrawlGenresDto) {
    try {
      const { data } = await crawlApi.get(crawlGenresDto.url);
      if (!data) throw new Error('Invalid URL');

      const $ = cheerio.load(data);
      const genres = $(crawlGenresDto.querySelector)
        .map((_, el) => this.capitalizeFirstLetter($(el).text()))
        .get();

      await this.genresQueue.add('crawl-genres', genres, {
        removeOnComplete: true,
        removeOnFail: true,
      });
    } catch (error) {
      this.logger.error('Failed to crawl genres', error.stack);
      throw new Error('Failed to crawl genres');
    }
  }

  capitalizeFirstLetter(str: string): string {
    if (!str) return str; // Kiểm tra nếu chuỗi rỗng hoặc null
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  async getOrCreateGenres(genreNames: string[]) {
    const existingGenres = await this.genresModel.find({
      name: { $in: genreNames },
    });

    const existingGenreNames = new Set(existingGenres.map((genre) => genre.name));

    const newGenres = genreNames
      .filter((name) => !existingGenreNames.has(name))
      .map((name) => ({ name }));

    const createdGenres = [];

    for (const genre of newGenres) {
      const createdGenre = await this.genresModel.create(genre);
      createdGenres.push(createdGenre);
    }

    return existingGenres.concat(createdGenres).map((genre) => genre);
  }
  // #endregion

  // #region Comic
  async crawlComic(crawlComicDto: CrawlComicDto) {
    try {
      const [genresList, rootFolder] = await Promise.all([
        this.genresModel.find({}),
        this.getOrCreateFolderRoot(),
      ]);
      for (const url of crawlComicDto.urls) {
        await this.comicQueue.add(
          'crawl-comic',
          {
            url,
            crawlComicDto,
            genresList: genresList,
            rootFolderId: rootFolder._id,
          },
          {
            removeOnComplete: true,
            removeOnFail: true,
          },
        );
      }
    } catch (error) {
      this.logger.error('Failed to crawl comics', error.stack);
      throw new Error('Failed to crawl comics');
    }
  }

  async getOrCreateAuthors(authors: CrawlAuthor[]): Promise<Types.ObjectId[]> {
    const existingAuthors = await this.authorModel.find({
      name: { $in: authors.map((a) => a.name) },
    });

    const existingAuthorNames = new Set(existingAuthors.map((author) => author.name));

    const newAuthors = authors.filter((a) => !existingAuthorNames.has(a.name));

    const createdAuthors = [];

    for (const author of newAuthors) {
      const createdAuthor = await this.authorModel.create(author);
      createdAuthors.push(createdAuthor);
    }

    return existingAuthors.concat(createdAuthors).map((author) => author._id);
  }

  async downloadAndSaveImage(imageUrl: string, parentFolder?: Types.ObjectId | null): Promise<any> {
    try {
      const res = await crawlApi.get(imageUrl, { responseType: 'arraybuffer' });
      const fileName = this.getFileNameFromUrl(imageUrl);
      if (!fileName) throw new Error('Unable to determine file name from URL');

      const filePath = path.join(process.cwd(), 'public/uploads', fileName);
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      fs.writeFileSync(filePath, res.data);
      const match = imageUrl.match(/\/([^\/\?]+)\.(jpg|png)(?:\?|$)/);
      return {
        originalName: match[1] || '',
        fileName,
        mimeType: res.headers['content-type'] || 'unknown',
        destination: 'public/uploads',
        size: res.data.length,
        parentFolder: parentFolder ? new Types.ObjectId(new Types.ObjectId(parentFolder)) : null,
      };
    } catch (error) {
      this.logger.error('Error downloading or saving the image', error.stack);
      throw new Error('Error downloading or saving the image');
    }
  }

  getFileNameFromUrl(url: string): string | null {
    const uniqueSuffix = randomUUID();
    const match = url.match(/\/([^\/\?]+)\.(jpg|png)(?:\?|$)/);

    if (match) {
      return `${match[1].replace(/-/g, '_')}_${uniqueSuffix}.${match[2]}`;
    }

    return null;
  }

  async getOrCreateFolderRoot() {
    const doc = await this.folderModel.findOne({ parentFolder: null });
    if (!doc) {
      return (await this.folderModel.create({ folderName: 'Root', parentFolder: null })).toJSON();
    }
    return doc.toJSON();
  }
  // #endregion

  // #region Reset
  async reset() {
    await Promise.all([
      this.comicModel.deleteMany({}),
      this.mediaModel.deleteMany({}),
      this.folderModel.deleteMany({}),
      this.authorModel.deleteMany({}),
      this.chapterModel.deleteMany({}),
      this.removeAllFiles(),
    ]);
  }

  async removeAllFiles(directory: string = '/public/uploads') {
    try {
      const basePath = path.join(process.cwd(), directory);
      const files = fs.readdirSync(basePath);

      for (const file of files) {
        fs.unlinkSync(path.join(basePath, file));
      }
      return 'ok';
    } catch (error) {
      console.error(`Error while removing files: ${error.message}`);
      throw new Error('Error while removing files');
    }
  }
  // #endregion
}
