import { Module } from '@nestjs/common';

import { CrawlController } from './crawl.controller';
import { CrawlService } from './crawl.service';
import { GenresModule } from '../genres/genres.module';
import { ComicModule } from '../comic/comic.module';
import { AuthorModule } from '../author/author.module';
import { UploadModule } from '../upload/upload.module';
import { ChapterModule } from '../chapter/chapter.module';

@Module({
  imports: [GenresModule, ComicModule, AuthorModule, UploadModule, ChapterModule],
  controllers: [CrawlController],
  providers: [CrawlService],
})
export class CrawlModule {}
