import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Author } from '~/schemas/author.schema';

@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author.name) private authorModel: Model<Author>) {}

  async create() {}

  async update() {}

  async delete(_id: Types.ObjectId) {
    const doc = await this.authorModel.findByIdAndDelete(_id);

    if (!doc) {
      throw new NotFoundException('Not found author with _id = ' + _id);
    }

    return doc;
  }
}
