import { Types } from 'mongoose';
import { TransformMongoObjectId } from '~/shared/decorators/validate-mongo-id';

export class CreateFollowDto {
  @TransformMongoObjectId()
  comic: Types.ObjectId | string;

  @TransformMongoObjectId()
  user: Types.ObjectId | string;
}
