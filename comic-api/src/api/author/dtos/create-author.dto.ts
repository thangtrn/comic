import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({
    default: 'Đang cập nhật',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
