import { Model, Types, ObjectId } from 'mongoose';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { Comment } from '~/schemas/comment.schema';
import { PaginationQueryDto } from '~/shared/dtos/pagination.dto';
import returnMeta from '~/helpers/metadata';
import Role from '~/shared/enums/role.enum';
import { UserDocument } from '~/schemas/user.schema';
import checkIsOwner from '~/utils/checkIsOwner';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>) {}

  async create(userId: Types.ObjectId, comment: CreateCommentDto) {
    const doc = await this.commentModel.create({ user: userId, ...comment });
    return doc;
  }

  async getAll() {
    return await this.commentModel.find();
  }

  async getByComicId(comicId: Types.ObjectId, pagination: PaginationQueryDto) {
    const [count, docs] = await Promise.all([
      this.commentModel.countDocuments({ comic: comicId }),
      this.commentModel.find({ comic: comicId }).skip(pagination.skip).limit(pagination.limit),
    ]);

    return returnMeta(docs, pagination.page, pagination.limit, count);
  }

  async update(user: any, comment: UpdateCommentDto) {
    const doc = (await this.commentModel.findById(comment._id))?.toJSON();

    if (!doc) {
      throw new NotFoundException('Not found comment with _id = ' + comment._id);
    }

    checkIsOwner(user._id, doc.user as Types.ObjectId, user.role);

    return await this.commentModel.updateOne(
      { _id: comment._id },
      {
        $set: { content: comment.content },
      },
      { new: true },
    );
  }

  async delete(user: UserDocument, _id: Types.ObjectId) {
    const doc = await this.commentModel.findById(_id);

    if (!doc) {
      throw new NotFoundException('Not found comment with _id = ' + _id);
    }

    checkIsOwner(user._id, doc.user as Types.ObjectId, user.role);

    return await this.commentModel.deleteOne({ _id: _id });
  }
}
