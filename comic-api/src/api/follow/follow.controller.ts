import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import JwtAuthGuard from '../auth/guards/jwt.guard';
import { GetFollowDto } from './dto/get-follow.dto';
import { Public } from '~/shared/decorators/public';
import { Request } from 'express';

@ApiTags('Follow')
@Controller('follow')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Public()
  @Get('/:comicId')
  getByComicId(@Param() params: GetFollowDto) {
    return this.followService.getByComicId(params.comicId);
  }

  @Post('/')
  create(@Req() req: Request, @Body() follow: CreateFollowDto) {
    return this.followService.create(req.user._id, follow);
  }

  @Put('/')
  update(@Req() req: Request, @Body() follow: UpdateFollowDto) {
    return this.followService.update(req.user._id, follow);
  }

  @Delete('/')
  delete(@Req() req: Request, @Body() follow: CreateFollowDto) {
    return this.followService.delete(req.user._id, follow);
  }
}
