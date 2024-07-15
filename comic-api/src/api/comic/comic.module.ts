import { Module } from '@nestjs/common';
import { ComicService } from './comic.service';
import { ComicController } from './comic.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comic, ComicSchema } from '~/schemas/comic.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comic.name, schema: ComicSchema }]),
  ],
  providers: [ComicService],
  controllers: [ComicController],
})
export class ComicModule {}