import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { Types } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Follow')
@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Get('/:comicId')
  getByComicId(@Param('comicId') comicId: string) {
    if (!Types.ObjectId.isValid(comicId)) {
      throw new BadRequestException('Type of comicId is invalid.');
    }
    return this.followService.getByComicId(new Types.ObjectId(comicId));
  }

  @Post()
  create(@Body() follow: CreateFollowDto) {
    return this.followService.create(follow);
  }

  @Patch(':id')
  update(@Body() follow: UpdateFollowDto) {
    return this.followService.update(follow);
  }

  @Delete()
  delete(@Body() follow: CreateFollowDto) {
    return this.followService.delete(follow);
  }
}
