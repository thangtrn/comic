import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category } from '~/schemas/category.schema';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { PaginationQueryDto } from '~/shared/dtos/pagination.dto';
import returnMeta from '~/helpers/metadata';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async getAll(pagination: PaginationQueryDto) {
    const [count, docs] = await Promise.all([
      this.categoryModel.countDocuments(),
      this.categoryModel.find().skip(pagination.skip).limit(pagination.limit),
    ]);

    return returnMeta(docs, pagination.page, pagination.limit, count);
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
