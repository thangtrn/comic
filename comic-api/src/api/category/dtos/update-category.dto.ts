import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import State from '~/shared/enums/state.enum';

export class UpdateCategoryDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @ApiProperty({
    default: 'Hài kịch update',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(State)
  @ApiProperty({
    default: State.Public,
  })
  state: State;
}
