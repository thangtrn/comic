import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category } from '~/schemas/category.schema';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async getAll() {
    return await this.categoryModel.find();
  }

  async create(category: CreateCategoryDto) {
    const doc = new this.categoryModel(category);
    return await doc.save();
  }

  async update(category: UpdateCategoryDto) {
    const { _id, ...categoryWithoutId } = category;
    const doc = await this.categoryModel.findByIdAndUpdate(
      _id,
      {
        $set: categoryWithoutId,
      },
      { new: true },
    );
    if (!doc) {
      throw new NotFoundException('Not found category with _id = ' + _id);
    }
    return doc;
  }

  async delete(_id: Types.ObjectId) {
    const doc = await this.categoryModel.findByIdAndDelete(_id);

    if (!doc) {
      throw new NotFoundException('Not found category with _id = ' + _id);
    }

    return doc;
  }
}
