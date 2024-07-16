import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chapter } from '~/schemas/chapter.schema';
import { CreateChapterDto } from './dtos/create-chapter.dto';
import { UpdateChapterDto } from './dtos/update-chapter.dto';
import removeNullUndefinedFields from '~/utils/removeNullUndefinedFields';

@Injectable()
export class ChapterService {
  constructor(
    @InjectModel(Chapter.name) private chapterModel: Model<Chapter>,
  ) {}

  async getAll() {
    return await this.chapterModel.find();
  }

  async getChapterBySlug(comicSlug: string, chapterSlug: string) {
    const doc = await this.chapterModel.aggregate([
      {
        $lookup: {
          from: 'chapters',
          let: {
            comicId: '$comic',
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
              $project: {
                name: 1,
                slug: 1,
              },
            },
          ],
          as: 'allChapter',
        },
      },
      {
        $lookup: {
          from: 'comics',
          let: {
            comicId: '$comic',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$comicId', '$_id'],
                },
              },
            },
            // thumbnail
            {
              $lookup: {
                from: 'media',
                localField: 'thumbnail',
                foreignField: '_id',
                as: 'thumbnail',
              },
            },
            {
              $unwind: {
                path: '$thumbnail',
              },
            },
            // categories
            {
              $lookup: {
                from: 'categories',
                localField: 'categories',
                foreignField: '_id',
                as: 'categories',
              },
            },
            // authors
            {
              $lookup: {
                from: 'authors',
                localField: 'authors',
                foreignField: '_id',
                as: 'authors',
              },
            },
          ],
          as: 'comic',
        },
      },
      {
        $unwind: {
          path: '$comic',
        },
      },
      {
        $match: {
          $and: [
            {
              'comic.slug': comicSlug,
            },
            {
              slug: chapterSlug,
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'media',
          localField: 'images',
          foreignField: '_id',
          as: 'images',
        },
      },
    ]);
    return doc;
  }

  async create(chapter: CreateChapterDto) {
    return await this.chapterModel.create(chapter);
  }

  async update(chapter: UpdateChapterDto) {
    const { _id, ...chapterWithoutId } = chapter;
    const doc = await this.chapterModel.findByIdAndUpdate(
      _id,
      {
        $set: removeNullUndefinedFields(chapterWithoutId),
      },
      { new: true },
    );
    if (!doc) {
      throw new NotFoundException('Not found chapter with _id = ' + _id);
    }
    return doc;
  }

  async delete(_id: Types.ObjectId) {
    const doc = await this.chapterModel.findByIdAndDelete(_id);

    if (!doc) {
      throw new NotFoundException('Not found chapter with _id = ' + _id);
    }

    return doc;
  }
}
