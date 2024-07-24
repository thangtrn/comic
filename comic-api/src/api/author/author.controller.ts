import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Roles } from '~/shared/decorators/roles';
import { Public } from '~/shared/decorators/public';
import Role from '~/shared/enums/role.enum';
import JwtAuthGuard from '~/api/auth/guards/jwt.guard';

import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { UpdateAuthorDto } from './dtos/update-author.dto';

@ApiTags('Author')
@Controller('author')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Roles(Role.Admin)
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get('/')
  @Public()
  async getAll() {
    return await this.authorService.getAll();
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
  async delete(@Param('_id') _id: string) {
    if (!Types.ObjectId.isValid(_id)) {
      throw new BadRequestException('Type of _id is invalid.');
    }
    return await this.authorService.delete(new Types.ObjectId(_id));
  }
}
