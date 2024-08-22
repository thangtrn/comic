import { Controller, Get, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from '../auth/guards/jwt.guard';
import { Roles } from '~/shared/decorators/roles';
import Role from '~/shared/enums/role.enum';

@ApiTags('Mail')
@Controller('mail')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Roles(Role.Admin)
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
