import { UserDocument } from '~/schemas/user.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Notification } from '~/schemas/notification.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationQueryDto } from '~/shared/dtos/pagination.dto';
import returnMeta from '~/helpers/metadata';
import checkUserPermission from '~/helpers/checkUserPermission';
import { CreateNotificationDto } from '../dtos/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private nofiticationModel: Model<Notification>,
  ) {}

  async getAll(user: UserDocument, pagination: PaginationQueryDto) {
    const queryOption = {
      isDeleted: false,
      user: user._id,
    };
    const [count, docs] = await Promise.all([
      this.nofiticationModel.countDocuments(queryOption),
      this.nofiticationModel.find(queryOption).skip(pagination.skip).limit(pagination.limit),
    ]);

    return returnMeta(docs, pagination.page, pagination.limit, count);
  }

  async createMany(notifications: CreateNotificationDto[]) {
    return await this.nofiticationModel.insertMany(notifications);
  }

  async read(user: UserDocument, _id: Types.ObjectId) {
    const doc = (await this.nofiticationModel.findById(_id))?.toJSON();

    if (!doc) {
      throw new NotFoundException('Not notification with _id = ' + _id);
    }

    checkUserPermission(user._id, doc.user as Types.ObjectId, user.role);

    return await this.nofiticationModel.findByIdAndUpdate(
      _id,
      {
        $set: {
          isReaded: true,
        },
      },
      { new: true },
    );
  }

  async delete(user: UserDocument, _id: Types.ObjectId) {
    const doc = (await this.nofiticationModel.findById(_id))?.toJSON();

    if (!doc) {
      throw new NotFoundException('Not notification with _id = ' + _id);
    }

    checkUserPermission(user._id, doc.user as Types.ObjectId, user.role);

    return await this.nofiticationModel.findByIdAndUpdate(
      _id,
      {
        $set: {
          isDeleted: true,
        },
      },
      { new: true },
    );
  }
}
