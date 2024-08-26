import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { OptionalObjectId, TransformMongoObjectId } from '~/shared/decorators/validate-mongo-id';

export class CreateChapterDto {
  @ApiProperty({
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    default: '',
  })
  @TransformMongoObjectId()
  comic: string | Types.ObjectId;

  @ApiProperty({
    default: [],
  })
  @OptionalObjectId('images')
  images?: string[] | Types.ObjectId[];
}
