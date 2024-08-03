import {
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Controller,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Roles } from '~/shared/decorators/roles';
import { Public } from '~/shared/decorators/public';
import Role from '~/shared/enums/role.enum';
import JwtAuthGuard from '~/api/auth/guards/jwt.guard';

import { ComicService } from './comic.service';
import { CreateComicDto } from './dtos/create-comic.dtos';
import { UpdateComicDto } from './dtos/update-comic.dtos';
import { ChapterService } from '../chapter/chapter.service';
import { SingleIdDto } from '~/shared/dtos/base-mongo-id.dto';

@ApiTags('Comic')
@Controller('comic')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Roles(Role.Admin)
export class ComicController {
  constructor(
    private readonly comicService: ComicService,
    private readonly chapterService: ChapterService,
  ) {}
  @Get('/')
  @Public()
  async getByQuery() {
    return this.comicService.getByQuery();
  }

  @Get('/:slug')
  @Public()
  async getBySlug(@Param('slug') slug: string) {
    return await this.comicService.getBySlug(slug);
  }

  @Get('/:comicSlug/chapter/:chapterSlug')
  @Public()
  async getChapterBySlug(
    @Param('comicSlug') comicSlug: string,
    @Param('chapterSlug') chapterSlug: string,
  ) {
    return await this.chapterService.getChapterBySlug(comicSlug, chapterSlug);
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
  async delete(@Param() param: SingleIdDto) {
    return this.comicService.delete(param._id);
  }
}
