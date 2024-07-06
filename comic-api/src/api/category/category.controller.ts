import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@ApiTags('Category')
@Controller('/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  async getAll() {
    return await this.categoryService.getAll();
  }

  @Post('/')
  async create(@Body() category: CreateCategoryDto) {
    return await this.categoryService.create(category);
  }

  @Put('/')
  async update(@Body() category: UpdateCategoryDto) {
    return await this.categoryService.update(category);
  }

  @Delete('/:_id')
  async delete(@Param('_id') _id: string) {
    if (!Types.ObjectId.isValid(_id)) {
      throw new BadRequestException('Type of _id is invalid.');
    }
    return await this.categoryService.delete(new Types.ObjectId(_id));
  }
}
