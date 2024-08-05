import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationTemplateDto } from './dto/create-notification-template.dto';
import { UpdateNotificationTemplateDto } from './dto/update-notification-template.dto';
import { Types } from 'mongoose';
import { SingleIdDto } from '~/shared/dtos/base-mongo-id.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '~/shared/dtos/pagination.dto';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('/')
  create(@Body() notification: CreateNotificationTemplateDto) {
    return this.notificationService.createTemplate(notification);
  }

  @Get('/')
  getAllTemplate(@Query() pagination: PaginationQueryDto) {
    return this.notificationService.getAll(pagination);
  }

  @Put('/')
  update(@Body() notification: UpdateNotificationTemplateDto) {
    return this.notificationService.update(notification);
  }

  @Delete('/:_id')
  deleteTemplate(@Param() param: SingleIdDto) {
    return this.notificationService.deleteTemplate(param._id);
  }
}
