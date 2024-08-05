import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import NotifyType from '~/shared/enums/notification.enum';

export class CreateNotificationTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(NotifyType)
  type: NotifyType = NotifyType.System;
}
