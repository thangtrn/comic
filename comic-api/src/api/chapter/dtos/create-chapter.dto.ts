import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import State from '~/shared/enums/state.enum';

export class CreateChapterDto {
  @ApiProperty({
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    default: State.Draft,
  })
  @IsOptional()
  @IsEnum(State)
  state?: State = State.Draft;

  @ApiProperty({
    default: '',
  })
  @IsNotEmpty()
  @Transform(({ value }) => new Types.ObjectId(value as string))
  comic: string | Types.ObjectId;

  @ApiProperty({
    default: [],
  })
  @IsOptional()
  @Transform(({ value }) =>
    value.map((item: string) => new Types.ObjectId(item as string)),
  )
  images?: string[] | Types.ObjectId[];
}
