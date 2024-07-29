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
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

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
  delete(@Param('_id') _id: string) {
    if (!Types.ObjectId.isValid(_id)) {
      throw new BadRequestException('Type of _id is invalid.');
    }
    return this.commentService.delete(new Types.ObjectId(_id));
  }
}
