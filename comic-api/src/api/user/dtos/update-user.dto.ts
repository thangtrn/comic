import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { TransformMongoObjectId } from '~/shared/decorators/validate-mongo-id';
import Role from '~/shared/enums/role.enum';

export class UpdateUserDto {
  @TransformMongoObjectId()
  _id: Types.ObjectId;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsBoolean()
  notify?: boolean;

  @IsOptional()
  @IsString()
  fcmToken?: string;

  @IsOptional()
  @IsBoolean()
  verify?: boolean;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
