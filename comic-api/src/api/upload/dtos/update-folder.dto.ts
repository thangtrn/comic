import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';
import { OptionalObjectId } from '~/shared/decorators/validate-mongo-id';

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
  @OptionalObjectId('parentFolder')
  parentFolder?: Types.ObjectId | string | null;
}
