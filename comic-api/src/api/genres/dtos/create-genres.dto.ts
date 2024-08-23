import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import State from '~/shared/enums/state.enum';

export class CreateGenresDto {
  @ApiProperty({
    default: 'Genres name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(State)
  @IsOptional()
  state?: State = State.Draft;
}
