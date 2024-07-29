import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { OptionalObjectId } from '~/shared/decorators/validate-mongo-id';

export class CreateFileDto {
  @ApiProperty({
    type: String,
    example: 'string',
    required: false,
    nullable: true,
  })
  @OptionalObjectId('parentFolder')
  parentFolder?: Types.ObjectId | string | null;
}
