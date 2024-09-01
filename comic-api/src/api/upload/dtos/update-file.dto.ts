import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { OptionalObjectId } from '~/shared/decorators/validate-mongo-id';
import { MultipleIdDto } from '~/shared/dtos/base-mongo-id.dto';

export class UpdateFileDto extends PartialType(MultipleIdDto) {
  @ApiProperty({
    type: String,
    example: 'string',
    required: false,
    nullable: true,
  })
  @OptionalObjectId('parentFolder')
  parentFolder?: Types.ObjectId | null;
}
