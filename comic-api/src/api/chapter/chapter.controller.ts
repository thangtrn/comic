import { Put, Post, Delete, Param, Controller, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Secured } from '~/shared/decorators/roles';
import Role from '~/shared/enums/role.enum';
import JwtAuthGuard from '~/api/auth/guards/jwt.guard';

import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dtos/create-chapter.dto';
import { UpdateChapterDto } from './dtos/update-chapter.dto';
import { SingleIdDto } from '~/shared/dtos/base-mongo-id.dto';

@ApiTags('Chapter')
@Controller('chapter')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Secured(Role.Admin)
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post('/')
  async create(@Body() chapter: CreateChapterDto) {
    return await this.chapterService.create(chapter);
  }

  @Put('/')
  async update(@Body() chapter: UpdateChapterDto) {
    return await this.chapterService.update(chapter);
  }

  @Delete('/:_id')
  async delete(@Param() param: SingleIdDto) {
    return await this.chapterService.delete(param._id);
  }
}
