import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import returnMeta from '~/helpers/metadata';
import { Comic } from '~/schemas/comic.schema';
import { CreateComicDto } from './dtos/create-comic.dto';
import { UpdateComicDto } from './dtos/update-comic.dto';
import { QueryComicDto } from './dtos/query-comic.dto';
import removeNullUndefinedFields from '~/utils/removeNullUndefinedFields';
import Sort from './enums/sort.enum';

@Injectable()
export class ComicService {
  constructor(@InjectModel(Comic.name) private comicModel: Model<Comic>) {}

  async getByQuery(comicQuery: QueryComicDto) {
    const searchOption: any = {
      $or: [
        {
          name: {
            $regex: `.*${comicQuery.search || ''}.*`,
            $options: 'i',
          },
        },
        {
          originName: {
            $regex: `.*${comicQuery.search || ''}.*`,
            $options: 'i',
          },
        },
      ],
    };

    if (comicQuery.status) {
      searchOption.status = comicQuery.status;
    }

    if (comicQuery.genres && comicQuery.genres.length > 0) {
      searchOption.genres = { $in: comicQuery.genres.map((genre) => new Types.ObjectId(genre)) };
    }

    const sortOption: any = {};
    switch (comicQuery.sortBy) {
      case Sort.CreatedAtAsc:
        sortOption.createdAt = 1;
        break;
      case Sort.CreatedAtDesc:
        sortOption.createdAt = -1;
        break;
      case Sort.UpdatedAtAsc:
        sortOption.updatedAt = 1;
        break;
      case Sort.UpdatedAtDesc:
        sortOption.updatedAt = -1;
        break;
      default:
        sortOption.createdAt = -1;
    }

    const [count, docs] = await Promise.all([
      this.comicModel.countDocuments(searchOption),
      this.comicModel
        .find(searchOption)
        .populate({ path: 'authors', model: 'Author' })
        .populate({ path: 'genres', model: 'Genres' })
        .sort(sortOption)
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
          from: 'genres',
          foreignField: '_id',
          localField: 'genres',
          as: 'genres',
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

  async getListUserFollow(comicId: Types.ObjectId) {
    const docs = await this.comicModel.aggregate([
      {
        $match: {
          _id: comicId,
        },
      },
      {
        $lookup: {
          from: 'follows',
          localField: '_id',
          foreignField: 'comic',
          as: 'follows',
        },
      },
      {
        $project: {
          name: 1,
          follows: {
            $filter: {
              input: '$follows',
              as: 'item',
              cond: { $eq: ['$$item.notify', true] },
            },
          },
        },
      },
    ]);
    return {
      comicId: docs?.[0]?._id,
      name: docs?.[0]?.name,
      userIds: docs?.[0]?.follows?.map((item: { user: Types.ObjectId }) => item.user),
    };
  }
}
