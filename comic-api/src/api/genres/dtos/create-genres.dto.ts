import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenresDto {
  @ApiProperty({
    default: 'Genres name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
