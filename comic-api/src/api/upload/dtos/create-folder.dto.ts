import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { OptionalObjectId } from '~/shared/decorators/validate-mongo-id';

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
  @OptionalObjectId('parentFolder')
  parentFolder?: Types.ObjectId | null;
}
