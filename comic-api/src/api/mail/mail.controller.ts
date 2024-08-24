import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import Role from '~/shared/enums/role.enum';
import { MailService } from './mail.service';
import JwtAuthGuard from '../auth/guards/jwt.guard';
import { Secured } from '~/shared/decorators/roles';
import { MailOptionsDto } from './dtos/mail-options.dto';

@ApiTags('Mail')
@Controller('mail')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Secured(Role.Admin)
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/send')
  async sendMail(@Body() mailOptionsDto: MailOptionsDto) {
    return this.mailService.sendMail(mailOptionsDto);
  }
}
