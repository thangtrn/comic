import { UserDocument } from '~/schemas/user.schema';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

import { Notification } from '~/schemas/notification.schema';
import { PaginationQueryDto } from '~/shared/dtos/pagination.dto';
import returnMeta from '~/helpers/metadata';
import checkUserPermission from '~/helpers/checkUserPermission';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { INotificationRedis, NotificationGateWay } from '../notification.gateway';

// ================== Notification Key Generation ====================
export const redisNotificationKey = (userId: string, socketId: string) =>
  `notification:${userId}:${socketId}`;

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<Notification>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly notificationGateway: NotificationGateWay,
  ) {}

  async getAll(user: UserDocument, pagination: PaginationQueryDto) {
    const queryOption = {
      isDeleted: false,
      user: user._id,
    };
    const [count, docs] = await Promise.all([
      this.notificationModel.countDocuments(queryOption),
      this.notificationModel.find(queryOption).skip(pagination.skip).limit(pagination.limit),
    ]);

    return returnMeta(docs, pagination.page, pagination.limit, count);
  }

  async createMany(notifications: CreateNotificationDto[]) {
    const createdNotifications = await this.notificationModel.insertMany(notifications);
    const notificationDocs = createdNotifications.map((notification) => notification.toJSON());

    // Lấy dữ liệu từ Redis
    const socketNotificationData: INotificationRedis[] =
      await this.getSocketNotificationDataByUsers(notificationDocs);

    // Gửi thông báo đến client
    for (const socketData of socketNotificationData) {
      const notificationForUser = notificationDocs.find(
        (notification) => notification.user.toString() === socketData.userId,
      );
      this.notificationGateway.io.to(socketData.socketId).emit('notification', notificationForUser);
    }

    return createdNotifications;
  }

  async read(user: UserDocument, _id: Types.ObjectId) {
    const doc = (await this.notificationModel.findById(_id))?.toJSON();

    if (!doc) {
      throw new NotFoundException('Not notification with _id = ' + _id);
    }

    checkUserPermission(user._id, doc.user as Types.ObjectId, user.role);

    return await this.notificationModel.findByIdAndUpdate(
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
    const doc = (await this.notificationModel.findById(_id))?.toJSON();

    if (!doc) {
      throw new NotFoundException('Not notification with _id = ' + _id);
    }

    checkUserPermission(user._id, doc.user as Types.ObjectId, user.role);

    return await this.notificationModel.findByIdAndUpdate(
      _id,
      {
        $set: {
          isDeleted: true,
        },
      },
      { new: true },
    );
  }

  // ----------- -----------
  async getSocketNotificationDataByUsers(users: any[]): Promise<INotificationRedis[]> {
    const redisKeys = [];
    for (const user of users) {
      const keys = await this.cacheManager.store.keys(redisNotificationKey(user._id, '*'));
      redisKeys.push(...keys);
    }

    const socketNotificationData: INotificationRedis[] = (await Promise.all(
      redisKeys.map((key) => this.cacheManager.get(key)),
    )) as INotificationRedis[];

    return socketNotificationData;
  }
}
