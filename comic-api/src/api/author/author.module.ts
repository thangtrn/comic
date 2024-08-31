import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { Author, AuthorSchema } from '~/schemas/author.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }])],
  providers: [AuthorService],
  controllers: [AuthorController],
  exports: [MongooseModule],
})
export class AuthorModule {}
