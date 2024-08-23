import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Roles } from '~/shared/decorators/roles';
import Role from '~/shared/enums/role.enum';
import JwtAuthGuard from '~/api/auth/guards/jwt.guard';

import { GenresService } from './genres.service';
import { CreateGenresDto } from './dtos/create-genres.dto';
import { UpdateGenresDto } from './dtos/update-genres.dto';
import { SingleIdDto } from '~/shared/dtos/base-mongo-id.dto';
import { PaginationQueryDto } from '~/shared/dtos/pagination.dto';
import { Public } from '~/shared/decorators/public';

@ApiTags('Genres')
@Controller('/genres')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Roles(Role.Admin)
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Public()
  @ApiQuery({
    name: 'tag',
    type: String,
    required: false,
  })
  @Get('/')
  async getAll(@Query() pagination?: PaginationQueryDto, @Query('tag') tag?: string) {
    return await this.genresService.getAll(pagination, tag);
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
