import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, ValidateIf } from 'class-validator';
import { Types } from 'mongoose';
import { MultipleIdDto } from '~/shared/dtos/base-mongo-id.dto';

export class UpdateFileDto extends PartialType(MultipleIdDto) {
  @ApiProperty({
    type: String,
    example: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @ValidateIf((o) => o.parentFolder !== null || o.parentFolder !== undefined)
  @Transform(({ value }) =>
    !value ? null : new Types.ObjectId(value as string),
  )
  parentFolder?: Types.ObjectId | string | null;
}
