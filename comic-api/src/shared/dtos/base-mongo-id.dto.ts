import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsMongoId, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class SingleIdDto {
  @ApiProperty({
    description: 'Array of MongoDB ObjectIds to be deleted',
    type: String,
    example: 'string',
  })
  @IsMongoId()
  @IsNotEmpty()
  _id: string;
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
