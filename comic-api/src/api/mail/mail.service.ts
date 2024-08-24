import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailOptionsDto } from './dtos/mail-options.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail({ to, subject, html, template, context }: MailOptionsDto) {
    try {
      if (template) {
        await this.mailerService.sendMail({
          to: to,
          subject: subject,
          template: template,
          context: context,
        });
      } else {
        await this.mailerService.sendMail({
          to: to,
          subject: subject,
          html: html,
        });
      }
      return 'ok';
    } catch (error) {
      throw new Error('Opps! Something went wrong.');
    }
  }
}
