import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comic } from '~/schemas/comic.schema';

@Injectable()
export class ComicService {
  constructor(@InjectModel(Comic.name) private comicModel: Model<Comic>) {}

  getByQuery() {}

  getBySlug() {}

  create() {}

  update() {}

  async delete(_id: Types.ObjectId) {
    const doc = await this.comicModel.findByIdAndDelete(_id);

    if (!doc) {
      throw new NotFoundException('Not found comic with _id = ' + _id);
    }

    return doc;
  }
}
