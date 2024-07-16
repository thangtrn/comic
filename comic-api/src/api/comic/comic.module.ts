import { Module } from '@nestjs/common';
import { ComicService } from './comic.service';
import { ComicController } from './comic.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comic, ComicSchema } from '~/schemas/comic.schema';
import { ChapterModule } from '~/api/chapter/chapter.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comic.name, schema: ComicSchema }]),
    ChapterModule,
  ],
  providers: [ComicService],
  controllers: [ComicController],
})
export class ComicModule {}
