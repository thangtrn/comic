import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chapter } from '~/schemas/chapter.schema';

@Injectable()
export class ChapterService {
  constructor(
    @InjectModel(Chapter.name) private chapterModel: Model<Chapter>,
  ) {}

  async create() {}

  async update() {}

  async delete(_id: Types.ObjectId) {
    const doc = await this.chapterModel.findByIdAndDelete(_id);

    if (!doc) {
      throw new NotFoundException('Not found chapter with _id = ' + _id);
    }

    return doc;
  }
}
