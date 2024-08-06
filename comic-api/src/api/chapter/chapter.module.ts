import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { Chapter, ChapterSchema } from '~/schemas/chapter.schema';
import { ComicModule } from '../comic/comic.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chapter.name, schema: ChapterSchema }]),
    forwardRef(() => ComicModule),
  ],
  controllers: [ChapterController],
  providers: [ChapterService],
  exports: [ChapterService],
})
export class ChapterModule {}
