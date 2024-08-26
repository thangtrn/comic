import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { endOfDay, startOfDay } from 'date-fns';

import returnMeta from '~/helpers/metadata';
import { Comic } from '~/schemas/comic.schema';
import { CreateComicDto } from './dtos/create-comic.dto';
import { UpdateComicDto } from './dtos/update-comic.dto';
import { QueryComicDto } from './dtos/query-comic.dto';
import removeNullUndefinedFields from '~/utils/removeNullUndefinedFields';
import Sort from './enums/sort.enum';
import { View } from '~/schemas/view.schema';
import { PaginationQueryDto } from '~/shared/dtos/pagination.dto';

@Injectable()
export class ComicService {
  constructor(
    @InjectModel(Comic.name) private comicModel: Model<View>,
    @InjectModel(View.name) private viewModel: Model<View>,
  ) {}

  async getByQuery(comicQuery: QueryComicDto, pagination: PaginationQueryDto) {
    let statusOption: any;

    if (comicQuery.status) {
      statusOption = {
        $match: {
          status: comicQuery.status,
        },
      };
    }

    let sortOption: any;

    switch (comicQuery.sortBy) {
      case Sort.CreatedAtDesc:
        sortOption = {
          $sort: {
            createdAt: -1,
          },
        };
        break;
      case Sort.UpdatedAtAsc:
        sortOption = {
          $sort: {
            updatedAt: 1,
          },
        };
        break;
      case Sort.UpdatedAtDesc:
        sortOption = {
          $sort: {
            updatedAt: -1,
          },
        };
        break;
      case Sort.ViewAsc:
        sortOption = {
          $sort: {
            views: 1,
          },
        };
        break;
      case Sort.ViewDesc:
        sortOption = {
          $sort: {
            views: -1,
          },
        };
        break;
      default: // sort by createdAt
        sortOption = {
          $sort: {
            createdAt: 1,
          },
        };
    }

    const queryPipeline: any[] = [
      // search
      {
        $match: {
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
        },
      },
      // filter
      statusOption,
      // main
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
      {
        $lookup: {
          from: 'views',
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
              $group: {
                _id: '$comic',
                count: { $sum: '$count' },
              },
            },
            {
              $project: {
                _id: 0,
                count: 1,
              },
            },
          ],
          as: 'views',
        },
      },
      {
        $addFields: {
          views: {
            $ifNull: [{ $arrayElemAt: ['$views.count', 0] }, 0],
          },
        },
      },
      {
        $addFields: {
          preview: {
            $ifNull: [
              {
                $slice: [
                  {
                    $arrayElemAt: ['$chapters.images', 0],
                  },
                  10,
                ],
              },
              [],
            ],
          },
        },
      },
      {
        $lookup: {
          from: 'media',
          localField: 'preview',
          foreignField: '_id',
          as: 'preview',
        },
      },
      // sort
      sortOption,
    ].filter((item) => item); // filter item !== null or undefine

    const [count, docs] = await Promise.all([
      this.comicModel.aggregate([...queryPipeline, { $count: 'totalDocuments' }]),
      this.comicModel.aggregate([
        ...queryPipeline,
        // pagination
        {
          $skip: pagination.skip,
        },
        {
          $limit: pagination.limit,
        },
      ]),
    ]);
    const totalDocuments = count.length > 0 ? count[0].totalDocuments : 0;
    return returnMeta(docs, pagination.page, pagination.limit, totalDocuments);
  }

  async suggestion(search: string, limit: number = 15) {
    const docs = await this.comicModel.aggregate([
      {
        $match: {
          $or: [
            {
              name: {
                $regex: `.*${search || ''}.*`,
                $options: 'i',
              },
            },
            {
              originName: {
                $regex: `.*${search || ''}.*`,
                $options: 'i',
              },
            },
          ],
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
            {
              $limit: 1,
            },
          ],
          as: 'lastChapter',
        },
      },
      {
        $addFields: {
          lastChapter: {
            $ifNull: [{ $arrayElemAt: ['$lastChapter', 0] }, null],
          },
        },
      },
      { $limit: limit },
    ]);

    return docs;
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
      {
        $lookup: {
          from: 'views',
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
              $group: {
                _id: '$comic',
                count: { $sum: '$count' },
              },
            },
            {
              $project: {
                _id: 0,
                count: 1,
              },
            },
          ],
          as: 'views',
        },
      },
      {
        $addFields: {
          views: {
            $ifNull: [{ $arrayElemAt: ['$views.count', 0] }, 0],
          },
        },
      },
      {
        $addFields: {
          preview: {
            $ifNull: [
              {
                $slice: [
                  {
                    $arrayElemAt: ['$chapters.images', 0],
                  },
                  10,
                ],
              },
              [],
            ],
          },
        },
      },
      {
        $lookup: {
          from: 'media',
          localField: 'preview',
          foreignField: '_id',
          as: 'preview',
        },
      },
    ]);
    return docs?.[0];
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

  // --------------- VIEW --------------
  async updateView(_id: Types.ObjectId) {
    const date = new Date();
    const doc = this.viewModel.findOneAndUpdate(
      { comic: _id, createdAt: { $gte: startOfDay(date), $lt: endOfDay(date) } },
      { $inc: { count: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );
    return doc;
  }
}
