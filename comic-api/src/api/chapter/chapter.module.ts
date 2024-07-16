import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chapter, ChapterSchema } from '~/schemas/chapter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chapter.name, schema: ChapterSchema }]),
  ],
  providers: [ChapterService],
  controllers: [ChapterController],
  exports: [ChapterService],
})
export class ChapterModule {}
