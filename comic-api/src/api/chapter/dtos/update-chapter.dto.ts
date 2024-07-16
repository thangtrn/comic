import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { CreateChapterDto } from './create-chapter.dto';

export class UpdateChapterDto extends PartialType(CreateChapterDto) {
  @ApiProperty({
    default: '',
  })
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @ApiProperty({
    default: '',
  })
  @IsOptional()
  @Transform(({ value }) => new Types.ObjectId(value as string))
  comic?: string | Types.ObjectId;
}
