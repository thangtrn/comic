import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comic } from '~/schemas/comic.schema';
import { CreateComicDto } from './dtos/create-comic.dto';
import { UpdateComicDto } from './dtos/update-comic.dto';
import { QueryComicDto } from './dtos/query-comic.dto';
import removeNullUndefinedFields from '~/utils/removeNullUndefinedFields';
import returnMeta from '~/helpers/metadata';

@Injectable()
export class ComicService {
  constructor(@InjectModel(Comic.name) private comicModel: Model<Comic>) {}

  async getByQuery(comicQuery: QueryComicDto) {
    const searchOption = {
      name: {
        $regex: `.*${comicQuery.search || ''}.*`,
        $options: 'i',
      },
    };
    const [count, docs] = await Promise.all([
      this.comicModel.countDocuments(searchOption),
      this.comicModel
        .find(searchOption)
        .skip(comicQuery.skip)
        .limit(comicQuery.limit),
    ]);

    return returnMeta(docs, comicQuery.page, comicQuery.limit, count);
  }

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
      {
        $lookup: {
          from: 'chapters',
          let: {
            comicId: '$_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$comicId', '$comic'],
                },
              },
            },

            {
              $sort: {
                createdAt: -1,
              },
            },
          ],
          as: 'chapters',
        },
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
