import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotificationTemplate } from '~/schemas/notification-template.schema';
import { CreateNotificationTemplateDto } from '../dtos/create-notification-template.dto';
import { UpdateNotificationTemplateDto } from '../dtos/update-notification-template.dto';
import removeNullUndefinedFields from '~/utils/removeNullUndefinedFields';
import { PaginationQueryDto } from '~/shared/dtos/pagination.dto';
import returnMeta from '~/helpers/metadata';
import NotifyType from '~/shared/enums/notification.enum';

@Injectable()
export class NotificationTemplateService {
  constructor(
    @InjectModel(NotificationTemplate.name)
    private nofiticationTemplateModel: Model<NotificationTemplate>,
  ) {}

  async createTemplate(notification: CreateNotificationTemplateDto) {
    const doc = await this.nofiticationTemplateModel.create(notification);
    return doc;
  }

  async getAllTemplate(pagination: PaginationQueryDto) {
    const [count, docs] = await Promise.all([
      this.nofiticationTemplateModel.countDocuments(),
      this.nofiticationTemplateModel
        .find()
        .skip(pagination.skip)
        .limit(pagination.limit),
    ]);

    return returnMeta(docs, pagination.page, pagination.limit, count);
  }

  async update(notification: UpdateNotificationTemplateDto) {
    const { _id, ...notificationWithoutId } = notification;

    const doc = await this.nofiticationTemplateModel.findByIdAndUpdate(
      _id,
      {
        $set: removeNullUndefinedFields(notificationWithoutId),
      },
      { new: true },
    );

    if (!doc) {
      throw new NotFoundException(
        'Not notification template with _id = ' + _id,
      );
    }
    return doc;
  }

  async deleteTemplate(_id: Types.ObjectId) {
    const doc = await this.nofiticationTemplateModel.findByIdAndDelete(_id);

    if (!doc) {
      throw new NotFoundException(
        'Not notification template with _id = ' + _id,
      );
    }
    return doc;
  }

  async getTemplateByType(type: NotifyType) {
    const doc = await this.nofiticationTemplateModel.findOne({ type: type });
    return doc;
  }
}
