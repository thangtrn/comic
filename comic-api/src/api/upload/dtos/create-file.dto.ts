import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, ValidateIf } from 'class-validator';

export class CreateFileDto {
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
