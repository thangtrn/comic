import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';

import { CreateNotificationTemplateDto } from '../dtos/create-notification-template.dto';
import { UpdateNotificationTemplateDto } from '../dtos/update-notification-template.dto';
import { SingleIdDto } from '~/shared/dtos/base-mongo-id.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '~/shared/dtos/pagination.dto';
import JwtAuthGuard from '../../auth/guards/jwt.guard';
import { Secured } from '~/shared/decorators/roles';
import Role from '~/shared/enums/role.enum';
import { NotificationTemplateService } from '../services/notification-template.service';

@ApiTags('Notification template')
@Controller('notification-template')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Secured(Role.Admin)
export class NotificationTemplateController {
  constructor(private readonly notificationTempateService: NotificationTemplateService) {}

  // Admin
  @Get('/')
  async getAllTemplate(@Query() pagination: PaginationQueryDto) {
    return await this.notificationTempateService.getAllTemplate(pagination);
  }

  @Post('/')
  create(@Body() notification: CreateNotificationTemplateDto) {
    return this.notificationTempateService.createTemplate(notification);
  }

  @Put('/')
  async update(@Body() notification: UpdateNotificationTemplateDto) {
    return await this.notificationTempateService.update(notification);
  }

  @Delete('/:_id')
  async deleteTemplate(@Param() param: SingleIdDto) {
    return await this.notificationTempateService.deleteTemplate(param._id);
  }
}
