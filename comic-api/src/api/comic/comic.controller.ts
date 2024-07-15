import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ComicService } from './comic.service';
import { CreateComicDto } from './dtos/create-comic.dtos';
import { UpdateComicDto } from './dtos/update-comic.dtos';
import { Types } from 'mongoose';

@ApiTags('Comic')
@Controller('comic')
export class ComicController {
  constructor(private readonly comicService: ComicService) {}
  @Get('/')
  async getByQuery() {}

  @Get('/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return await this.comicService.getBySlug(slug);
  }

  @Post('/')
  async create(@Body() comic: CreateComicDto) {
    return await this.comicService.create(comic);
  }

  @Put('/')
  async update(@Body() comic: UpdateComicDto) {
    return await this.comicService.update(comic);
  }

  @Delete('/:_id')
  async delete(@Param('_id') _id: string) {
    return this.comicService.delete(new Types.ObjectId(_id));
  }
}
