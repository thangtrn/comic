import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { OptionalObjectId } from '~/shared/decorators/validate-mongo-id';

export class QueryAssetsDto {
  @ApiProperty({
    type: String,
    example: 'string',
    required: false,
    nullable: true,
  })
  @OptionalObjectId('parent')
  parent: Types.ObjectId | null;
}
