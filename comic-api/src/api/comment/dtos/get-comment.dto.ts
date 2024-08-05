import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { TransformMongoObjectId } from '~/shared/decorators/validate-mongo-id';

export class GetCommentByComicIdDto {
  @ApiProperty({
    type: String,
    example: 'string',
  })
  @TransformMongoObjectId()
  comicId: Types.ObjectId;
}
