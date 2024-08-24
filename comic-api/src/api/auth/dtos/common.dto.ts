import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class EmailDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
}

export class TokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}

export class PasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}
