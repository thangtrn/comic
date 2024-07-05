import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import State from '~/shared/enums/state.enum';

export class CreateCategoryDto {
  @ApiProperty({
    default: 'Hài kịch',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(State)
  @IsOptional()
  state?: State = State.Draft;
}
