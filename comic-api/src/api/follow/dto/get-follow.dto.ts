import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { TransformMongoObjectId } from '~/shared/decorators/validate-mongo-id';

export class GetFollowDto {
  @ApiProperty({
    type: String,
    example: 'string',
  })
  @TransformMongoObjectId()
  comicId: Types.ObjectId;
}
