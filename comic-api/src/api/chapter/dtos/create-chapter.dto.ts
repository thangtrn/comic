import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import State from '~/shared/enums/state.enum';
import {
  OptionalObjectId,
  TransformMongoObjectId,
} from '~/shared/decorators/validate-mongo-id';

export class CreateChapterDto {
  @ApiProperty({
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    default: State.Draft,
  })
  @IsOptional()
  @IsEnum(State)
  state?: State = State.Draft;

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
