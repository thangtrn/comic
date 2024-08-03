import { PartialType } from '@nestjs/swagger';
import { CreateFollowDto } from './create-follow.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateFollowDto extends PartialType(CreateFollowDto) {
  @IsBoolean()
  @IsNotEmpty()
  notify: boolean;
}
