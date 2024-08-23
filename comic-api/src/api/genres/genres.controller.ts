import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Secured } from '~/shared/decorators/roles';
import Role from '~/shared/enums/role.enum';
import JwtAuthGuard from '~/api/auth/guards/jwt.guard';

import { GenresService } from './genres.service';
import { CreateGenresDto } from './dtos/create-genres.dto';
import { UpdateGenresDto } from './dtos/update-genres.dto';
import { SingleIdDto } from '~/shared/dtos/base-mongo-id.dto';
import { PaginationQueryDto } from '~/shared/dtos/pagination.dto';
import { Public } from '~/shared/decorators/public';
import RouteCache from '~/shared/decorators/route-cache';

@ApiTags('Genres')
@Controller('/genres')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Secured(Role.Admin)
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @ApiQuery({
    name: 'type',
    type: String,
    required: false,
  })
  @Public()
  @RouteCache()
  @Get('/')
  async getAll(@Query() pagination?: PaginationQueryDto, @Query('type') type?: string) {
    return await this.genresService.getAll(pagination, type);
  }

  @Post('/')
  async create(@Body() genres: CreateGenresDto) {
    return await this.genresService.create(genres);
  }

  @Put('/')
  async update(@Body() genres: UpdateGenresDto) {
    return await this.genresService.update(genres);
  }

  @Delete('/:_id')
  async delete(@Param() param: SingleIdDto) {
    return await this.genresService.delete(param._id);
  }
}
