import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class DeleteMediaDto {
  @ApiProperty({
    default: ['string', 'string'],
  })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Types.ObjectId)
  _ids: Array<Types.ObjectId>;
}
