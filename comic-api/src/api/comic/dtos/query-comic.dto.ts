import { IsEnum, IsOptional, IsString } from 'class-validator';

import Status from '../enums/status.enum';
import Sort from '../enums/sort.enum';
import { Transform } from 'class-transformer';

export class QueryComicDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status = null;

  @IsOptional()
  @IsEnum(Sort)
  sortBy?: Sort = Sort.CreatedAtDesc;

  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  genres?: string[] = [];
}

export class QueryGenresDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status = null;

  @IsOptional()
  @IsEnum(Sort)
  sortBy?: Sort = Sort.CreatedAtDesc;
}
