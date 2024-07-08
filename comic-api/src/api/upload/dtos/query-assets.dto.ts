import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, ValidateIf } from 'class-validator';
import { Types } from 'mongoose';

export class QueryAssetsDto {
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
  parent: Types.ObjectId | null;
}
