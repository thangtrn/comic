import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import {
  Notification,
  NotificationSchema,
} from '~/schemas/notification.schema';
import {
  NotificationTemplate,
  NotificationTemplateSchema,
} from '~/schemas/notification-template.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: NotificationTemplate.name, schema: NotificationTemplateSchema },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
