import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ComicService } from './comic.service';
import { ComicController } from './comic.controller';
import { Comic, ComicSchema } from '~/schemas/comic.schema';
import { View, ViewSchema } from '~/schemas/view.schema';
import { ChapterModule } from '~/api/chapter/chapter.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comic.name, schema: ComicSchema },
      { name: View.name, schema: ViewSchema },
    ]),
    ChapterModule,
  ],
  providers: [ComicService],
  controllers: [ComicController],
  exports: [ComicService],
})
export class ComicModule {}
