import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { TransformMongoObjectId } from '../decorators/validate-mongo-id';

export class SingleIdDto {
  @ApiProperty({
    type: String,
    example: 'string',
  })
  @TransformMongoObjectId()
  _id: Types.ObjectId;
}

export class MultipleIdDto {
  @ApiProperty({
    description: 'Array of MongoDB ObjectIds to be deleted',
    type: [String],
    example: ['string'],
  })
  @IsMongoId({ each: true })
  @IsNotEmpty()
  @ArrayMinSize(1)
  _ids: string[];
}
