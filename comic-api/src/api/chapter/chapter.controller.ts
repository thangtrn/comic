import {
  Get,
  Put,
  Post,
  Delete,
  Param,
  Controller,
  BadRequestException,
  Body,
  UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Roles } from '~/shared/decorators/roles';
import { Public } from '~/shared/decorators/public';
import Role from '~/shared/enums/role.enum';
import JwtAuthGuard from '~/api/auth/guards/jwt.guard';

import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dtos/create-chapter.dto';
import { UpdateChapterDto } from './dtos/update-chapter.dto';

@ApiTags('Chapter')
@Controller('chapter')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Roles(Role.Admin)
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Get('/')
  @Public()
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
