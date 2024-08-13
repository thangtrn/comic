import { PartialType } from '@nestjs/swagger';
import { CreateNotificationTemplateDto } from './create-notification-template.dto';
import { Types } from 'mongoose';
import { TransformMongoObjectId } from '~/shared/decorators/validate-mongo-id';

export class CreateNotificationDto extends PartialType(CreateNotificationTemplateDto) {
  @TransformMongoObjectId()
  user: Types.ObjectId;
}
