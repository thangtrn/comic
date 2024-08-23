import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { OptionalObjectId } from '~/shared/decorators/validate-mongo-id';
import State from '~/shared/enums/state.enum';
import Status from '../enums/status.enum';

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
  @OptionalObjectId('thumbnail')
  thumbnail?: string | Types.ObjectId;

  @ApiProperty({
    default: State.Draft,
  })
  @IsOptional()
  @IsEnum(State)
  state?: State = State.Draft;

  @ApiProperty({
    default: [],
  })
  @OptionalObjectId('authors')
  authors?: Types.ObjectId[] | string[];

  @ApiProperty({
    default: [],
  })
  @OptionalObjectId('genres')
  genres?: Types.ObjectId[] | string[];

  @IsOptional()
  @IsEnum(Status)
  @ApiProperty({
    default: Status.Process,
  })
  status?: Status;
}
