import { Model, Types } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { Comment } from '~/schemas/comment.schema';
import { PaginationQueryDto } from '~/shared/dtos/pagination.dto';
import returnMeta from '~/helpers/metadata';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async create(comment: CreateCommentDto) {
    const doc = await this.commentModel.create(comment);
    return doc;
  }

  async getAll() {
    return await this.commentModel.find();
  }

  async getByComicId(comicId: Types.ObjectId, pagination: PaginationQueryDto) {
    const [count, docs] = await Promise.all([
      this.commentModel.countDocuments({ comic: comicId }),
      this.commentModel
        .find({ comic: comicId })
        .skip(pagination.skip)
        .limit(pagination.limit),
    ]);

    return returnMeta(docs, pagination.page, pagination.limit, count);
  }

  async update(comment: UpdateCommentDto) {
    const doc = await this.commentModel.findByIdAndUpdate(
      comment._id,
      {
        $set: { content: comment.content },
      },
      { new: true },
    );
    if (!doc) {
      throw new NotFoundException(
        'Not found comment with _id = ' + comment._id,
      );
    }
    return doc;
  }

  async delete(_id: Types.ObjectId) {
    const doc = await this.commentModel.findByIdAndDelete(_id);

    if (!doc) {
      throw new NotFoundException('Not found comment with _id = ' + _id);
    }

    return doc;
  }
}
