import { Controller, Get, Post, Body, Param, Delete, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { SingleIdDto } from '~/shared/dtos/base-mongo-id.dto';
import { PaginationQueryDto } from '~/shared/dtos/pagination.dto';
import { GetCommentByComicIdDto } from './dtos/get-comment.dto';
import { Request } from 'express';
import JwtAuthGuard from '../auth/guards/jwt.guard';
import { Public } from '~/shared/decorators/public';

@ApiTags('Comment')
@Controller('comment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Public()
  @Get('/:comicId')
  getByComicId(@Param() comment: GetCommentByComicIdDto, @Query() pagination: PaginationQueryDto) {
    return this.commentService.getByComicId(comment.comicId, pagination);
  }

  @Post('/')
  create(@Req() req: Request, @Body() comment: CreateCommentDto) {
    return this.commentService.create(req.user._id, comment);
  }

  @Put('/')
  update(@Req() req: Request, @Body() comment: UpdateCommentDto) {
    return this.commentService.update(req.user, comment);
  }

  @Delete('/:_id')
  delete(@Req() req: Request, @Param() param: SingleIdDto) {
    return this.commentService.delete(req.user, param._id);
  }
}
