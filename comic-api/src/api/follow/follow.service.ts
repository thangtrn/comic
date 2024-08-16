import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { Follow } from '~/schemas/follow.schema';

@Injectable()
export class FollowService {
  constructor(@InjectModel(Follow.name) private followModel: Model<Follow>) {}

  async getByComicId(comicId: Types.ObjectId) {
    return await this.followModel
      .find({ comic: comicId })
      .populate({ path: 'user', select: 'name email' });
  }

  async create(userId: Types.ObjectId, follow: CreateFollowDto) {
    return await this.followModel.create({ user: userId, comic: follow.comic });
  }

  async update(userId: Types.ObjectId, follow: UpdateFollowDto) {
    const doc = await this.followModel.findOneAndUpdate(
      { comic: follow.comic, user: userId },
      {
        $set: {
          notify: follow.notify,
        },
      },
      { new: true },
    );
    if (!doc) {
      throw new NotFoundException(
        `Not found follow with comicId = ${follow.comic} and userId = ${userId}.`,
      );
    }
    return doc;
  }

  async delete(userId: Types.ObjectId, follow: CreateFollowDto) {
    const doc = await this.followModel.findOneAndDelete({
      comic: follow.comic,
      user: userId,
    });
    if (!doc) {
      throw new NotFoundException(
        `Not found follow with comicId = ${follow.comic} and userId = ${userId}.`,
      );
    }
    return doc;
  }
}
