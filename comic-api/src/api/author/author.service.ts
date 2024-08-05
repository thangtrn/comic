import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Author } from '~/schemas/author.schema';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { UpdateAuthorDto } from './dtos/update-author.dto';
import { PaginationQueryDto } from '~/shared/dtos/pagination.dto';
import returnMeta from '~/helpers/metadata';

@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author.name) private authorModel: Model<Author>) {}

  async getAll(pagination: PaginationQueryDto) {
    const [docs, count] = await Promise.all([
      this.authorModel.find().skip(pagination.skip).limit(pagination.limit),
      this.authorModel.countDocuments(),
    ]);
    return returnMeta(docs, pagination.page, pagination.limit, count);
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
