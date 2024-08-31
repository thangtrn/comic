import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as cheerio from 'cheerio';
import { Model, Types } from 'mongoose';
import crawlApi from './axios/crawl-api';
import { CrawlComicDto, CrawlGenresDto } from './dtos/crawl.dto';
import { Genres } from '~/schemas/genres.schema';
import { Comic } from '~/schemas/comic.schema';
import Status from '../comic/enums/status.enum';
import { Author } from '~/schemas/author.schema';
import * as path from 'path';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { Folder } from '~/schemas/folder.schema';
import { Media } from '~/schemas/media.schema';
import { CrawlAuthor, CrawlChapter, CrawlComicData } from './types/crawl';
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

      if (genres.length > 0) {
        const genresDocs = await this.getOrCreateGenres(genres);
        return genresDocs;
      }
      return [];
    } catch (error) {
      this.logger.error('Failed to crawl genres', error.stack);
      throw new Error('Failed to crawl genres');
    }
  }

  private capitalizeFirstLetter(str: string): string {
    if (!str) return str; // Kiểm tra nếu chuỗi rỗng hoặc null
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  private async getOrCreateGenres(genreNames: string[]) {
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
      const listComicData = await Promise.all(
        crawlComicDto.urls.map(async (url) => {
          try {
            const { data } = await crawlApi.get(url);
            if (!data) throw new Error('Invalid URL');

            const $ = cheerio.load(data);
            const comicData: CrawlComicData = {
              name: $(crawlComicDto.name).text().trim(),
              originName: [$(crawlComicDto.originName).text().trim()],
              introduce: $(crawlComicDto.introduce).text().trim(),
              thumbnail: $(crawlComicDto.thumbnail).attr('src') || '',
              status:
                $(crawlComicDto.thumbnail).text().toLowerCase() === 'hoàn thành'
                  ? Status.Done
                  : Status.OnGoing,
              authors: $(crawlComicDto.authors)
                .map((_, el) => ({ name: $(el).text().trim() }))
                .get(),
              genres: $(crawlComicDto.genres)
                .map((_, el) => ({ name: $(el).text().trim() }))
                .get(),
              chapters: $(crawlComicDto.chapters)
                .map((_, el) => ({ name: $(el).text().trim(), link: $(el).attr('href') }))
                .get()
                .reverse(),
            };

            return comicData;
          } catch (error) {
            this.logger.error(`Failed to crawl comic from URL: ${url}`, error.stack);
            return null; // Return null if there's an error
          }
        }),
      );

      const filteredComicData = listComicData.filter((data) => data !== null);
      const result = await this.saveListComic(filteredComicData, crawlComicDto.chapterImages);
      return result;
    } catch (error) {
      this.logger.error('Failed to crawl comics', error.stack);
      throw new Error('Failed to crawl comics');
    }
  }

  private async saveListComic(
    listComicData: CrawlComicData[],
    chapterImagesQuerySelector?: string,
  ) {
    try {
      const comicResult = [];
      const [genresList, rootFolder] = await Promise.all([
        this.genresModel.find({}),
        this.getOrCreateFolderRoot(),
      ]);

      for (const comic of listComicData) {
        // Check for existing comic
        const existingComic = await this.comicModel.findOne({ name: comic.name });
        if (existingComic) continue;

        // Create or find authors
        const authorsIds = await this.getOrCreateAuthors(comic.authors);

        // Create or update folder
        const folderDoc = await this.folderModel.findOneAndUpdate(
          { folderName: comic.name },
          { $setOnInsert: { folderName: comic.name, parentFolder: rootFolder._id } },
          { upsert: true, new: true },
        );

        // Download and save thumbnail image
        const imageMetadata = await this.downloadAndSaveImage(comic.thumbnail, folderDoc._id);
        const thumbnailDoc = await this.mediaModel.create(imageMetadata);

        // Create new comic
        const newComic = await this.comicModel.create({
          name: comic.name,
          introduce: comic.introduce,
          status: comic.status,
          originName: comic.originName,
          genres: genresList
            .filter((genre) => comic.genres.some((g) => g.name === genre.name))
            .map((genre) => new Types.ObjectId(genre._id)),
          authors: authorsIds,
          thumbnail: thumbnailDoc._id,
        });

        // Save chapters and their images
        const chapters = [];
        for (const chapter of comic.chapters) {
          const chapterDoc = await this.saveListChapters(
            chapterImagesQuerySelector,
            [chapter], // Process one chapter at a time
            newComic._id,
            folderDoc._id,
          );
          chapters.push(...chapterDoc); // Flatten array if necessary
        }

        // Add new comic with its chapters to result
        comicResult.push({ ...newComic.toJSON(), chapters });
      }

      return comicResult;
    } catch (error) {
      this.logger.error('Failed to save comics', error.stack);
      throw new Error('Failed to save comics');
    }
  }

  private async getOrCreateAuthors(authors: CrawlAuthor[]): Promise<Types.ObjectId[]> {
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

  private async downloadAndSaveImage(
    imageUrl: string,
    parentFolder?: Types.ObjectId | null,
  ): Promise<any> {
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
        parentFolder: parentFolder || null,
      };
    } catch (error) {
      this.logger.error('Error downloading or saving the image', error.stack);
      throw new Error('Error downloading or saving the image');
    }
  }

  private getFileNameFromUrl(url: string): string | null {
    const uniqueSuffix = randomUUID();
    const match = url.match(/\/([^\/\?]+)\.(jpg|png)(?:\?|$)/);

    if (match) {
      return `${match[1].replace(/-/g, '_')}_${uniqueSuffix}.${match[2]}`;
    }

    return null;
  }

  async saveListChapters(
    querySelector: string,
    chapters: CrawlChapter[],
    comicId: Types.ObjectId,
    parentFolder?: Types.ObjectId | null,
  ) {
    try {
      const result = [];

      for (const chapter of chapters) {
        const { data } = await crawlApi.get('https://truyenqqto.com' + chapter.link);
        if (!data) throw new Error(`Failed to fetch data for chapter: ${chapter.name}`);

        const $ = cheerio.load(data);
        const images = $(querySelector)
          .map((_, el) => $(el).attr('src'))
          .get();

        const folderDoc = await this.folderModel.create({
          folderName: chapter.name,
          parentFolder: parentFolder,
        });

        const mediaDocs = [];

        for (const image of images) {
          const img = await this.downloadAndSaveImage(image, folderDoc._id);
          const mediaDoc = await this.mediaModel.create(img);
          mediaDocs.push(mediaDoc);
        }

        const chapterDoc = await this.chapterModel.create({
          name: chapter.name,
          images: mediaDocs.map((doc) => doc._id),
          comic: comicId,
        });

        result.push(chapterDoc.toJSON());
      }

      return result;
    } catch (error) {
      this.logger.error('Failed to save chapters', error.stack);
      throw new Error('Failed to save chapters: ' + error.message);
    }
  }

  private async getOrCreateFolderRoot() {
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
