import { Controller, Get, Post, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';

import { NotificationService } from '../services/notification.service';
import { SingleIdDto } from '~/shared/dtos/base-mongo-id.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '~/shared/dtos/pagination.dto';
import JwtAuthGuard from '../../auth/guards/jwt.guard';

@ApiTags('Notification')
@Controller('notification')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // User
  @Get('/')
  async getAll(@Req() req: Request, @Query() pagination: PaginationQueryDto) {
    return await this.notificationService.getAll(req.user, pagination);
  }

  @Post('/read/:_id')
  async read(@Req() req: Request, @Param() param: SingleIdDto) {
    return this.notificationService.read(req.user, param._id);
  }

  @Delete('/delete/:_id')
  async delete(@Req() req: Request, @Param() param: SingleIdDto) {
    return this.notificationService.delete(req.user, param._id);
  }
}
