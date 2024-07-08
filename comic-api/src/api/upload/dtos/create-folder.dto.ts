import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

export class CreateFolderDto {
  @IsString()
  @IsNotEmpty()
  folderName: string;

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
