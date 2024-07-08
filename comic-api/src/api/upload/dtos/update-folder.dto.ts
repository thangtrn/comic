import { PartialType } from '@nestjs/swagger';
import { CreateFolderDto } from './create-folder.dto';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateFolderDto extends PartialType(CreateFolderDto) {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;
}
