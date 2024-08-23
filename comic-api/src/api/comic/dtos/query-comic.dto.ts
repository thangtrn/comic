import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '~/shared/dtos/pagination.dto';
import Status from '../enums/status.enum';
import Sort from '../enums/sort.enum';

export class QueryComicDto extends PartialType(PaginationQueryDto) {
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
  genres?: string[] = [];
}
