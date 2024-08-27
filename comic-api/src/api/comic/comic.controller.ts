import { Get, Post, Put, Delete, Body, Param, Controller, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Secured } from '~/shared/decorators/roles';
import { Public } from '~/shared/decorators/public';
import Role from '~/shared/enums/role.enum';
import JwtAuthGuard from '~/api/auth/guards/jwt.guard';
import RouteCache from '~/shared/decorators/route-cache';

import { SingleIdDto } from '~/shared/dtos/base-mongo-id.dto';
import { PaginationQueryDto } from '~/shared/dtos/pagination.dto';
import { ComicService } from './comic.service';
import { CreateComicDto } from './dtos/create-comic.dto';
import { UpdateComicDto } from './dtos/update-comic.dto';
import { ChapterService } from '../chapter/chapter.service';
import { QueryComicDto, QueryGenresDto } from './dtos/query-comic.dto';
import { QuerySuggestionDto } from './dtos/query-suggestion.dto';

@ApiTags('Comic')
@Controller('comic')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Secured(Role.Admin)
export class ComicController {
  constructor(
    private readonly comicService: ComicService,
    private readonly chapterService: ChapterService,
  ) {}

  @Public()
  // @RouteCache()
  @Get('/')
  async getByQuery(@Query() comicQuery: QueryComicDto, @Query() pagination: PaginationQueryDto) {
    return this.comicService.getByQuery(comicQuery, pagination);
  }

  @Public()
  @RouteCache()
  @Get('/search/suggestion')
  async suggestion(@Query() query: QuerySuggestionDto) {
    return this.comicService.suggestion(query.search, query.limit);
  }

  @Public()
  @RouteCache()
  @Get('/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return await this.comicService.getBySlug(slug);
  }

  @Public()
  @RouteCache()
  @Get('/:comicSlug/chapter/:chapterSlug')
  async getChapterBySlug(
    @Param('comicSlug') comicSlug: string,
    @Param('chapterSlug') chapterSlug: string,
  ) {
    return await this.chapterService.getChapterBySlug(comicSlug, chapterSlug);
  }

  @Public()
  @RouteCache()
  @Get('/search/:genresSlug')
  getByGenres(
    @Param('genresSlug') genresSlug: string,
    @Query() comicQuery: QueryGenresDto,
    @Query() pagination: PaginationQueryDto,
  ) {
    return this.comicService.getByGenres(genresSlug, comicQuery, pagination);
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

  @Public()
  @Get('/:_id/view')
  updateView(@Param() param: SingleIdDto) {
    return this.comicService.updateView(param._id);
  }
}
