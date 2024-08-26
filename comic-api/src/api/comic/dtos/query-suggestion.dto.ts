import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QuerySuggestionDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  limit?: number;
}
