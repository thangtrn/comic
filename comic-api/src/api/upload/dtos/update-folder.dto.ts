import { ObjectId, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UpdateFolderDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @IsOptional()
  @ValidateIf((o) => o.folderName !== null || o.folderName !== undefined)
  @IsString()
  folderName?: string;

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
