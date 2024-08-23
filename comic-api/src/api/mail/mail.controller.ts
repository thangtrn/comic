import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { MailService } from './mail.service';
import JwtAuthGuard from '../auth/guards/jwt.guard';
import { Secured } from '~/shared/decorators/roles';
import Role from '~/shared/enums/role.enum';

@ApiTags('Mail')
@Controller('mail')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Secured(Role.Admin)
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('/send')
  async sendMail() {
    return this.mailService.sendMail({
      to: 'thangtrn01@gmail.com',
      subject: 'Verify Email for Comic',
      template: 'verify-account',
      context: {
        username: 'Thắng trần',
        verification_link: 'xin-chao/verify',
      },
    });
  }
}
