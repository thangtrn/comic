import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '~/shared/dtos/pagination.dto';

export class QueryComicDto extends PartialType(PaginationQueryDto) {
  @IsOptional()
  @IsString()
  search?: string;
}
