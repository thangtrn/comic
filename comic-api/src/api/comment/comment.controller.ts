import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { SingleIdDto } from '~/shared/dtos/base-mongo-id.dto';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/')
  create(@Body() comment: CreateCommentDto) {
    return this.commentService.create(comment);
  }

  @Get('/')
  getAll() {
    return this.commentService.getAll();
  }

  @Get('/:comicId')
  getByComicId(@Param('comicId') comicId: string) {
    if (!Types.ObjectId.isValid(comicId)) {
      throw new BadRequestException('Type of _id is invalid.');
    }
    return this.commentService.getByComicId(new Types.ObjectId(comicId));
  }

  @Put('/:_id')
  update(@Body() comment: UpdateCommentDto) {
    return this.commentService.update(comment);
  }

  @Delete('/:_id')
  delete(@Param() param: SingleIdDto) {
    return this.commentService.delete(param._id);
  }
}
