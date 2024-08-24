import { IsString, IsOptional, IsObject, ArrayNotEmpty, IsEmail } from 'class-validator';

export class MailOptionsDto {
  @ArrayNotEmpty()
  @IsEmail({}, { each: true })
  to: string[];

  @IsString()
  subject: string;

  @IsOptional()
  @IsString()
  html?: string;

  @IsOptional()
  @IsString()
  template?: string;

  @IsOptional()
  @IsObject()
  context?: Record<string, any>;
}
