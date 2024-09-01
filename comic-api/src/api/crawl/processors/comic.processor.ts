import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { InjectModel } from '@nestjs/mongoose';
import { Job, Queue } from 'bullmq';
import { Model, Types } from 'mongoose';
import * as cheerio from 'cheerio';

import { Comic } from '~/schemas/comic.schema';
import { CrawlComicData } from '../types/crawl';
import { Folder } from '~/schemas/folder.schema';
import { Media } from '~/schemas/media.schema';
import { CrawlService } from '../crawl.service';
import crawlApi from '../axios/crawl-api';
import Status from '~/api/comic/enums/status.enum';
import { CrawlComicDto } from '../dtos/crawl.dto';

@Processor('comic-queue', { concurrency: 5 })
export class ComicProcessor extends WorkerHost {
  constructor(
    @InjectModel(Comic.name) private comicModel: Model<Comic>,
    @InjectModel(Folder.name) private folderModel: Model<Folder>,
    @InjectModel(Media.name) private mediaModel: Model<Media>,
    private crawlService: CrawlService,
    @InjectQueue('chapter-queue') private chapterQueue: Queue,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'crawl-comic': {
        console.log(`Processing crawl-comic job with ${job.id}`);
        const { url, crawlComicDto, genresList, rootFolderId } = job.data;
        await this.saveListComic(url, crawlComicDto, genresList, rootFolderId);
      }
    }
  }

  async saveListComic(
    url: string,
    crawlComicDto: CrawlComicDto,
    genresList: any[],
    rootFolderId: Types.ObjectId,
  ) {
    try {
      const { data } = await crawlApi.get(url);
      if (!data) throw new Error('Invalid URL');

      const $ = cheerio.load(data);
      const comic: CrawlComicData = {
        name: $(crawlComicDto.name).text().trim(),
        originName: [$(crawlComicDto.originName).text().trim()],
        introduce: $(crawlComicDto.introduce).text().trim(),
        thumbnail: $(crawlComicDto.thumbnail).attr('src') || '',
        status:
          $(crawlComicDto.thumbnail).text().toLowerCase() === 'hoàn thành'
            ? Status.Done
            : Status.OnGoing,
        authors: $(crawlComicDto.authors)
          .map((_, el) => ({
            name: $(el).text().trim() ? $(el).text().trim() : 'Đang Cập Nhật',
          }))
          .get(),
        genres: $(crawlComicDto.genres)
          .map((_, el) => ({ name: $(el).text().trim() }))
          .get(),
        chapters: $(crawlComicDto.chapters)
          .map((_, el) => ({ name: $(el).text().trim(), link: $(el).attr('href') }))
          .get()
          .reverse(),
      };

      const existingComic = await this.comicModel.findOne({ name: comic.name });
      if (existingComic) {
        return;
      }

      // Create or find authors
      const authorsIds = await this.crawlService.getOrCreateAuthors(comic.authors);

      // Create or update folder
      const folderDoc = await this.folderModel.findOneAndUpdate(
        { folderName: comic.name },
        {
          $setOnInsert: { folderName: comic.name, parentFolder: new Types.ObjectId(rootFolderId) },
        },
        { upsert: true, new: true },
      );

      // Download and save thumbnail image
      const imageMetadata = await this.crawlService.downloadAndSaveImage(
        comic.thumbnail,
        folderDoc._id,
      );
      const thumbnailDoc = await this.mediaModel.create(imageMetadata);

      // Create new comic
      const newComic = await this.comicModel.create({
        name: comic.name,
        introduce: comic.introduce,
        status: comic.status,
        originName: comic.originName,
        genres: genresList
          .filter((genre) => comic.genres.some((g) => g.name === genre.name))
          .map((genre) => new Types.ObjectId(genre?._id as string)),
        authors: authorsIds,
        thumbnail: thumbnailDoc._id,
      });

      for (const chapter of comic.chapters) {
        await this.chapterQueue.add(
          'crawl-chapter',
          {
            querySelector: crawlComicDto.chapterImages,
            chapter: chapter,
            comicId: newComic._id,
            parentFolder: folderDoc._id,
          },
          {
            removeOnComplete: true,
            removeOnFail: true,
          },
        );
      }
    } catch (error) {
      console.error('Error in saveListComic:', error); // Improved error logging
      throw new Error('Failed to save comics');
    }
  }
}
