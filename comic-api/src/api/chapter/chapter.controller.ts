import {
  Get,
  Put,
  Post,
  Delete,
  Param,
  Controller,
  BadRequestException,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChapterService } from './chapter.service';
import { Types } from 'mongoose';
import { CreateChapterDto } from './dtos/create-chapter.dto';
import { UpdateChapterDto } from './dtos/update-chapter.dto';

@ApiTags('Chapter')
@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Get('/')
  async getAll() {
    return await this.chapterService.getAll();
  }

  @Post('/')
  async create(@Body() chapter: CreateChapterDto) {
    return await this.chapterService.create(chapter);
  }

  @Put('/')
  async update(@Body() chapter: UpdateChapterDto) {
    return await this.chapterService.update(chapter);
  }

  @Delete('/:_id')
  async delete(@Param('_id') _id: string) {
    if (!Types.ObjectId.isValid(_id)) {
      throw new BadRequestException('Type of _id is invalid.');
    }
    return await this.chapterService.delete(new Types.ObjectId(_id));
  }
}
