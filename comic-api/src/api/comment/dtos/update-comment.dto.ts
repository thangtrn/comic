import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
