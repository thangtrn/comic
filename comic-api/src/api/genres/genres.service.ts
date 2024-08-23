import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Genres } from '~/schemas/genres.schema';
import { CreateGenresDto } from './dtos/create-genres.dto';
import { UpdateGenresDto } from './dtos/update-genres.dto';
import { PaginationQueryDto } from '~/shared/dtos/pagination.dto';
import returnMeta from '~/helpers/metadata';

@Injectable()
export class GenresService {
  constructor(@InjectModel(Genres.name) private genresModel: Model<Genres>) {}

  async getAll(pagination: PaginationQueryDto, type: string) {
    if (type === 'all') {
      const docs = this.genresModel.find({});
      return docs;
    }
    const [count, docs] = await Promise.all([
      this.genresModel.countDocuments({}),
      this.genresModel.find({}).skip(pagination.skip).limit(pagination.limit),
    ]);

    return returnMeta(docs, pagination.page, pagination.limit, count);
  }

  async create(genres: CreateGenresDto) {
    const doc = new this.genresModel(genres);
    return await doc.save();
  }

  async update(genres: UpdateGenresDto) {
    const { _id, ...genresWithoutId } = genres;
    const doc = await this.genresModel.findByIdAndUpdate(
      _id,
      {
        $set: genresWithoutId,
      },
      { new: true },
    );
    if (!doc) {
      throw new NotFoundException('Not found genres with _id = ' + _id);
    }
    return doc;
  }

  async delete(_id: Types.ObjectId) {
    const doc = await this.genresModel.findByIdAndDelete(_id);

    if (!doc) {
      throw new NotFoundException('Not found genres with _id = ' + _id);
    }

    return doc;
  }
}
