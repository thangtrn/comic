import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationTemplateService } from './services/notification-template.service';
import { NotificationService } from './services/notification.service';
import NotifyType from '~/shared/enums/notification.enum';
import { Types } from 'mongoose';
import { CreateNotificationDto } from './dtos/create-notification.dto';

@Injectable()
export class NotificationListener {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly notificationTempateService: NotificationTemplateService,
  ) {}

  @OnEvent('notification.created')
  async createNotification(type: NotifyType, data: Record<string, any>) {
    const doc = await this.notificationTempateService.getTemplateByType(type);
    if (!doc) {
      return;
    }
    const docTemplate = doc.toJSON();
    const insertDatas: CreateNotificationDto[] = (data?.userIds as Types.ObjectId[])?.map((userId) => ({
      user: userId,
      name: this.replacePlaceholders(docTemplate.name, data),
      content: this.replacePlaceholders(docTemplate.content, data),
      type: type,
    }));
    if (insertDatas.length > 0) {
      await this.notificationService.createMany(insertDatas);
    }
  }

  replacePlaceholders(str: string, data: Record<string, any>): string {
    return str.replace(/{([^{}]*)}/g, (match, key) => {
      const keys = key.split('.');
      let value: any = data;
      for (let i = 0; i < keys.length; i++) {
        value = value[keys[i]];
        if (value === undefined) {
          return match;
        }
      }
      return value;
    });
  }
}
