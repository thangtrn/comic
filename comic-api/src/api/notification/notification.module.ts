import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotificationService } from './services/notification.service';
import { NotificationController } from './controllers/notification.controller';
import { NotificationTemplateController } from './controllers/notification-template.controller';
import { Notification, NotificationSchema } from '~/schemas/notification.schema';
import {
  NotificationTemplate,
  NotificationTemplateSchema,
} from '~/schemas/notification-template.schema';
import { NotificationTemplateService } from './services/notification-template.service';
import { NotificationListener } from './notification.listener';
import { NotificationGateWay } from './notification.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: NotificationTemplate.name, schema: NotificationTemplateSchema },
    ]),
  ],
  controllers: [NotificationController, NotificationTemplateController],
  providers: [
    NotificationService,
    NotificationTemplateService,
    NotificationListener,
    NotificationGateWay,
  ],
})
export class NotificationModule {}
