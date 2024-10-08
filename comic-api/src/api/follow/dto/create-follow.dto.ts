import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { TransformMongoObjectId } from '~/shared/decorators/validate-mongo-id';

export class CreateFollowDto {
  @ApiProperty({
    type: String,
    default: '',
  })
  @TransformMongoObjectId()
  comic: Types.ObjectId | string;
}
