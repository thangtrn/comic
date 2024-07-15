import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import State from '~/shared/enums/state.enum';
import Status from '~/shared/enums/status.enum';

export class UpdateComicDto {
  @ApiProperty({
    default: '',
  })
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @ApiProperty({
    default: 'New comic updated',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    default: [],
  })
  @IsOptional()
  @IsString({ each: true })
  originName?: string[];

  @ApiProperty({
    default: '',
  })
  @IsOptional()
  @IsString()
  introduce?: string;

  @ApiProperty({
    default: '',
  })
  @IsMongoId()
  @IsOptional()
  @Transform(({ value }) =>
    !value ? null : new Types.ObjectId(value as string),
  )
  thumbnail?: string;

  @ApiProperty({
    default: State.Draft,
  })
  @IsOptional()
  @IsEnum(State)
  state?: State = State.Draft;

  @ApiProperty({
    default: [],
  })
  @IsOptional()
  @Transform(({ value }) =>
    value.map((item: string) => new Types.ObjectId(item as string)),
  )
  authors?: string[] | Types.ObjectId[];

  @ApiProperty({
    default: [],
  })
  @IsOptional()
  @Transform(({ value }) =>
    value.map((item: string) => new Types.ObjectId(item as string)),
  )
  categories?: string[] | Types.ObjectId[];

  @IsOptional()
  @IsEnum(Status)
  @ApiProperty({
    default: Status.Process,
  })
  status?: Status;
}
