import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Author } from '~/schemas/author.schema';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { UpdateAuthorDto } from './dtos/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author.name) private authorModel: Model<Author>) {}

  async getAll() {
    return await this.authorModel.find();
  }

  async create(author: CreateAuthorDto) {
    const doc = await this.authorModel.create(author);
    return doc;
  }

  async update(author: UpdateAuthorDto) {
    const { _id, ...authorWithoutId } = author;
    const doc = await this.authorModel.findByIdAndUpdate(
      _id,
      {
        $set: authorWithoutId,
      },
      { new: true },
    );
    if (!doc) {
      throw new NotFoundException('Not found author with _id = ' + _id);
    }
    return doc;
  }

  async delete(_id: Types.ObjectId) {
    const doc = await this.authorModel.findByIdAndDelete(_id);

    if (!doc) {
      throw new NotFoundException('Not found author with _id = ' + _id);
    }

    return doc;
  }
}
