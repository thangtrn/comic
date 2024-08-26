import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateGenresDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @ApiProperty({
    default: 'Hài kịch update',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
