import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { CreateChapterDto } from './create-chapter.dto';
import { OptionalObjectId } from '~/shared/decorators/validate-mongo-id';

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
  @OptionalObjectId('comic')
  comic?: string | Types.ObjectId;
}
