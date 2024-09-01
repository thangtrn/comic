import { Processor, WorkerHost } from '@nestjs/bullmq';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bullmq';
import { Model, Types } from 'mongoose';
import * as cheerio from 'cheerio';

import { Chapter } from '~/schemas/chapter.schema';
import { Folder } from '~/schemas/folder.schema';
import { Media } from '~/schemas/media.schema';
import { CrawlService } from '../crawl.service';
import { CrawlChapter } from '../types/crawl';
import crawlApi from '../axios/crawl-api';

@Processor('chapter-queue', { concurrency: 50 })
export class ChapterProcessor extends WorkerHost {
  constructor(
    @InjectModel(Folder.name) private folderModel: Model<Folder>,
    @InjectModel(Media.name) private mediaModel: Model<Media>,
    @InjectModel(Chapter.name) private chapterModel: Model<Chapter>,
    private crawlService: CrawlService,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'crawl-chapter': {
        const { querySelector, chapter, comicId, parentFolder } = job.data;
        console.log(`Processing crawl-chapter job with ${job.id} chapter ${chapter.name}`); // Debugging line
        await this.saveListChapters(querySelector, chapter, comicId, parentFolder);
      }
    }
  }

  async saveListChapters(
    querySelector: string,
    chapter: CrawlChapter,
    comicId: Types.ObjectId,
    parentFolder: Types.ObjectId,
  ) {
    try {
      const { data } = await crawlApi.get('https://truyenqqto.com' + chapter.link);
      if (!data) throw new Error(`Failed to fetch data for chapter: ${chapter.name}`);

      const $ = cheerio.load(data);
      const images = $(querySelector)
        .map((_, el) => $(el).attr('src'))
        .get();

      const folderDoc = await this.folderModel.create({
        folderName: chapter.name,
        parentFolder: new Types.ObjectId(parentFolder),
      });

      const mediaDocs = [];

      for (const image of images) {
        const img = await this.crawlService.downloadAndSaveImage(image, folderDoc._id);
        const mediaDoc = await this.mediaModel.create(img);
        mediaDocs.push(mediaDoc);
      }

      const chapterDoc = await this.chapterModel.create({
        name: chapter.name,
        images: mediaDocs.map((doc) => doc._id),
        comic: new Types.ObjectId(comicId),
      });
      return chapterDoc;
    } catch (error) {
      throw new Error('Failed to save chapters: ' + error.message);
    }
  }
}
