import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comic } from '~/schemas/comic.schema';
import { CreateComicDto } from './dtos/create-comic.dtos';
import { UpdateComicDto } from './dtos/update-comic.dtos';
import removeNullUndefinedFields from '~/utils/removeNullUndefinedFields';

@Injectable()
export class ComicService {
  constructor(@InjectModel(Comic.name) private comicModel: Model<Comic>) {}

  async getByQuery() {}

  async getBySlug(slug: string) {
    const docs = await this.comicModel.aggregate([
      {
        $match: {
          slug: slug,
        },
      },
      {
        $lookup: {
          from: 'categories',
          foreignField: '_id',
          localField: 'categories',
          as: 'categories',
        },
      },
      {
        $lookup: {
          from: 'authors',
          foreignField: '_id',
          localField: 'authors',
          as: 'authors',
        },
      },
      {
        $lookup: {
          from: 'media',
          foreignField: '_id',
          localField: 'thumbnail',
          as: 'thumbnail',
        },
      },
      {
        $unwind: '$thumbnail',
      },
    ]);
    return docs;
  }

  async create(comic: CreateComicDto) {
    const doc = await this.comicModel.create(comic);
    return doc;
  }

  async update(comic: UpdateComicDto) {
    const { _id, ...comicWithoutId } = comic;
    const doc = await this.comicModel.findByIdAndUpdate(
      _id,
      {
        $set: removeNullUndefinedFields(comicWithoutId),
      },
      {
        new: true,
      },
    );
    if (!doc) {
      throw new NotFoundException('Not found comic with _id = ' + _id);
    }
    return doc;
  }

  async delete(_id: Types.ObjectId) {
    const doc = await this.comicModel.findByIdAndDelete(_id);

    if (!doc) {
      throw new NotFoundException('Not found comic with _id = ' + _id);
    }

    return doc;
  }
}
