import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import {
  OptionalObjectId,
  TransformMongoObjectId,
} from '~/shared/decorators/validate-mongo-id';

export class CreateCommentDto {
  @ApiProperty({
    default: '',
  })
  @TransformMongoObjectId()
  user: string | Types.ObjectId;

  @ApiProperty({
    default: '',
  })
  @TransformMongoObjectId()
  comic: string | Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    default: '',
  })
  @OptionalObjectId('parentComment')
  parentComment: string | Types.ObjectId;
}
