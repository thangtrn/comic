import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { OptionalObjectId } from '~/shared/decorators/validate-mongo-id';
import { PaginationQueryDto } from '~/shared/dtos/pagination.dto';

export class QueryAssetsDto extends PaginationQueryDto {
  @ApiProperty({
    type: String,
    example: 'string',
    required: false,
    nullable: true,
  })
  @OptionalObjectId('parentFolderId')
  parentFolderId?: Types.ObjectId | null;
}
