import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { Genres, GenresSchema } from '~/schemas/genres.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Genres.name, schema: GenresSchema }])],
  providers: [GenresService],
  controllers: [GenresController],
})
export class GenresModule {}
