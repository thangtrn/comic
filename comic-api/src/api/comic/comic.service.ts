import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { endOfDay, endOfMonth, endOfWeek, startOfDay, startOfMonth, startOfWeek } from 'date-fns';

import returnMeta from '~/helpers/metadata';
import { Comic } from '~/schemas/comic.schema';
import { CreateComicDto } from './dtos/create-comic.dto';
import { UpdateComicDto } from './dtos/update-comic.dto';
import { QueryComicDto, QueryGenresDto } from './dtos/query-comic.dto';
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

  // ----------- builder query -----------

  private buildPipeline(comicQuery: QueryComicDto | QueryGenresDto, genresSlug?: string): any[] {
    const searchStages: any[] = [];
    const filterStages: any[] = [];
    const matchViewStages: any[] = [];

    // Filter by genres or specific genre slug
    if (genresSlug) {
      filterStages.push({ 'genres.slug': { $in: [genresSlug] } });
    } else if ((comicQuery as QueryComicDto)?.genres?.length > 0) {
      filterStages.push({ 'genres.slug': { $in: (comicQuery as QueryComicDto)?.genres } });
    }

    // Filter by status
    if (comicQuery.status) {
      filterStages.push({ status: comicQuery.status });
    }

    // Search by name or originName
    if (comicQuery.search) {
      const searchRegex = { $regex: `.*${comicQuery.search}.*`, $options: 'i' };
      searchStages.push({
        $or: [{ name: searchRegex }, { originName: searchRegex }],
      });
    }

    // Determine sort option
    const sortOption = {
      [Sort.CreatedAtDesc]: { createdAt: -1 },
      [Sort.UpdatedAtAsc]: { updatedAt: 1 },
      [Sort.UpdatedAtDesc]: { updatedAt: -1 },
      [Sort.ViewAsc]: { views: 1 },
      [Sort.TopDay]: { viewSort: -1, views: -1 },
      [Sort.TopWeek]: { viewSort: -1, views: -1 },
      [Sort.TopMonth]: { viewSort: -1, views: -1 },
    }[comicQuery.sortBy] || { createdAt: 1 };

    // Determine filter based on sort criteria (TopDay, TopWeek, TopMonth)
    const date = new Date();

    // Map date ranges for sorting criteria
    const dateRangeMap = {
      [Sort.TopDay]: [startOfDay(date), endOfDay(date)],
      [Sort.TopWeek]: [startOfWeek(date), endOfWeek(date)],
      [Sort.TopMonth]: [startOfMonth(date), endOfMonth(date)],
    };

    const dateRange = dateRangeMap[comicQuery.sortBy];
    if (dateRange) {
      // Add date range filter to match stages
      matchViewStages.push(
        {
          $lookup: {
            from: 'views',
            let: {
              comicId: '$_id',
            },
            pipeline: [
              {
                $match: {
                  $and: [
                    {
                      $expr: {
                        $eq: ['$$comicId', '$comic'],
                      },
                    },
                    {
                      createdAt: {
                        $gte: dateRange[0],
                        $lte: dateRange[1],
                      },
                    },
                  ],
                },
              },
              {
                $group: {
                  _id: '$comic',
                  count: {
                    $sum: '$count',
                  },
                },
              },
              {
                $project: {
                  _id: 0,
                  count: 1,
                },
              },
            ],
            as: 'viewSort',
          },
        },
        {
          $addFields: {
            viewSort: {
              $ifNull: [
                {
                  $arrayElemAt: ['$viewSort.count', 0],
                },
                0,
              ],
            },
          },
        },
      );
    }

    // Combine search and filter stages with lookup stages
    const pipeline: any[] = [
      // Lookup genres before filtering
      { $lookup: { from: 'genres', foreignField: '_id', localField: 'genres', as: 'genres' } },

      // Apply search stages
      { $match: searchStages.length ? { $and: searchStages } : {} },

      // Apply filter stages
      { $match: filterStages.length ? { $and: filterStages } : {} },

      // Additional lookups and transformations
      { $lookup: { from: 'authors', foreignField: '_id', localField: 'authors', as: 'authors' } },
      { $lookup: { from: 'media', foreignField: '_id', localField: 'thumbnail', as: 'thumbnail' } },
      { $unwind: '$thumbnail' },

      // For chapters
      {
        $lookup: {
          from: 'chapters',
          let: { comicId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$$comicId', '$comic'] } } },
            { $sort: { createdAt: -1 } },
          ],
          as: 'chapters',
        },
      },

      // For views
      {
        $lookup: {
          from: 'views',
          let: { comicId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$$comicId', '$comic'] } } },
            { $group: { _id: '$comic', count: { $sum: '$count' } } },
            { $project: { _id: 0, count: 1 } },
          ],
          as: 'views',
        },
      },
      {
        $addFields: {
          views: { $ifNull: [{ $arrayElemAt: ['$views.count', 0] }, 0] },
          preview: {
            $ifNull: [{ $slice: [{ $arrayElemAt: ['$chapters.images', 0] }, 10] }, []],
          },
        },
      },

      // For preview
      { $lookup: { from: 'media', localField: 'preview', foreignField: '_id', as: 'preview' } },

      // Remove images in chapters
      {
        $addFields: {
          chapters: {
            $map: {
              input: '$chapters',
              as: 'chapter',
              in: {
                _id: '$$chapter._id',
                name: '$$chapter.name',
                comic: '$$chapter.comic',
                createdAt: '$$chapter.createdAt',
                updatedAt: '$$chapter.updatedAt',
                slug: '$$chapter.slug',
              },
            },
          },
        },
      },

      // For lastChapter
      {
        $addFields: {
          lastChapter: {
            $ifNull: [{ $arrayElemAt: ['$chapters', 0] }, null],
          },
        },
      },
      ...matchViewStages,
      // Sort
      { $sort: sortOption },
    ];

    return pipeline;
  }

  // ----------- service -----------

  async getByQuery(comicQuery: QueryComicDto, pagination: PaginationQueryDto) {
    const pipeline = this.buildPipeline(comicQuery);

    const [count, docs] = await Promise.all([
      this.comicModel.aggregate([...pipeline, { $count: 'totalDocuments' }]),
      this.comicModel.aggregate([
        ...pipeline,
        // Pagination
        { $skip: pagination.skip },
        { $limit: pagination.limit },
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
      {
        $addFields: {
          chapters: {
            $map: {
              input: '$chapters',
              as: 'chapter',
              in: {
                _id: '$$chapter._id',
                name: '$$chapter.name',
                comic: '$$chapter.comic',
                createdAt: '$$chapter.createdAt',
                updatedAt: '$$chapter.updatedAt',
                slug: '$$chapter.slug',
              },
            },
          },
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

  async updateView(_id: Types.ObjectId) {
    const date = new Date();
    const doc = this.viewModel.findOneAndUpdate(
      { comic: _id, createdAt: { $gte: startOfDay(date), $lt: endOfDay(date) } },
      { $inc: { count: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );
    return doc;
  }

  async getByGenres(
    genresSlug: string,
    comicQuery: QueryGenresDto,
    pagination: PaginationQueryDto,
  ) {
    const pipeline = this.buildPipeline(comicQuery, genresSlug);

    const [count, docs] = await Promise.all([
      this.comicModel.aggregate([...pipeline, { $count: 'totalDocuments' }]),
      this.comicModel.aggregate([
        ...pipeline,
        // Pagination
        { $skip: pagination.skip },
        { $limit: pagination.limit },
      ]),
    ]);

    const totalDocuments = count.length > 0 ? count[0].totalDocuments : 0;
    return returnMeta(docs, pagination.page, pagination.limit, totalDocuments);
  }
}
