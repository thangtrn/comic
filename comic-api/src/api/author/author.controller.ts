import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Roles } from '~/shared/decorators/roles';
import { Public } from '~/shared/decorators/public';
import Role from '~/shared/enums/role.enum';
import JwtAuthGuard from '~/api/auth/guards/jwt.guard';

import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { UpdateAuthorDto } from './dtos/update-author.dto';
import { SingleIdDto } from '~/shared/dtos/base-mongo-id.dto';
import { PaginationQueryDto } from '~/shared/dtos/pagination.dto';

@ApiTags('Author')
@Controller('author')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Roles(Role.Admin)
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Public()
  @Get('/')
  async getAll(@Query() pagination: PaginationQueryDto) {
    return await this.authorService.getAll(pagination);
  }

  @Post('/')
  async create(@Body() author: CreateAuthorDto) {
    return await this.authorService.create(author);
  }

  @Put('/')
  async update(@Body() author: UpdateAuthorDto) {
    return await this.authorService.update(author);
  }

  @Delete('/:_id')
  async delete(@Param() param: SingleIdDto) {
    return await this.authorService.delete(param._id);
  }
}
