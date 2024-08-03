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

  async create(follow: CreateFollowDto) {
    return await this.followModel.create(follow);
  }

  async update(follow: UpdateFollowDto) {
    const doc = await this.followModel.findOneAndUpdate(
      { comic: follow.comic, user: follow.user },
      {
        $set: {
          nofity: follow.notify,
        },
      },
      { new: true },
    );
    if (!doc) {
      throw new NotFoundException(
        `Not found follow with comicId = ${follow.comic} and userId = ${follow.user}.`,
      );
    }
    return doc;
  }

  async delete(follow: CreateFollowDto) {
    const doc = await this.followModel.findOneAndDelete({
      comic: follow.comic,
      user: follow.user,
    });
    if (!doc) {
      throw new NotFoundException(
        `Not found follow with comicId = ${follow.comic} and userId = ${follow.user}.`,
      );
    }
    return doc;
  }
}
