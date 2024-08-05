import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { SingleIdDto } from '~/shared/dtos/base-mongo-id.dto';
import { PaginationQueryDto } from '~/shared/dtos/pagination.dto';
import { GetCommentByComicIdDto } from './dtos/get-comment.dto';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/')
  create(@Body() comment: CreateCommentDto) {
    return this.commentService.create(comment);
  }

  @Get('/:comicId')
  getByComicId(
    @Param() comment: GetCommentByComicIdDto,
    @Query() pagination: PaginationQueryDto,
  ) {
    return this.commentService.getByComicId(comment.comicId, pagination);
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
