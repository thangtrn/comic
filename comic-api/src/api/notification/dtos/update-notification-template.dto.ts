import { PartialType } from '@nestjs/swagger';
import { CreateNotificationTemplateDto } from './create-notification-template.dto';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateNotificationTemplateDto extends PartialType(CreateNotificationTemplateDto) {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;
}
