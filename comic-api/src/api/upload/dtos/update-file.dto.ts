import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, ValidateIf } from 'class-validator';
import { MultipleIdDto } from '~/shared/dtos/base-mongo-id.dto';

export class UpdateFileDto extends PartialType(MultipleIdDto) {
  @ApiProperty({
    type: String,
    example: 'string',
    required: false,
    nullable: true,
  })
  @ValidateIf((o) => o.parentFolder !== null || o.parentFolder !== undefined)
  @IsOptional()
  parentFolder?: string | null;
}
