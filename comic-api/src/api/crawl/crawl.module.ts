import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { CrawlController } from './crawl.controller';
import { CrawlService } from './crawl.service';
import { GenresModule } from '../genres/genres.module';
import { ComicModule } from '../comic/comic.module';
import { AuthorModule } from '../author/author.module';
import { UploadModule } from '../upload/upload.module';
import { ChapterModule } from '../chapter/chapter.module';
import { GenresProcessor } from './processors/genres.processor';
import { ComicProcessor } from './processors/comic.processor';
import { ChapterProcessor } from './processors/chapter.processor';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'genres-queue' }),
    BullModule.registerQueue({ name: 'comic-queue' }),
    BullModule.registerQueue({ name: 'chapter-queue' }),
    GenresModule,
    ComicModule,
    AuthorModule,
    UploadModule,
    ChapterModule,
  ],
  controllers: [CrawlController],
  providers: [CrawlService, GenresProcessor, ComicProcessor, ChapterProcessor],
})
export class CrawlModule {}
