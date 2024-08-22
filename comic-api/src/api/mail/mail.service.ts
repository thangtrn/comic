import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailOptions } from './interfaces/mail.interface';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail({ to, subject, html, template, context }: MailOptions) {
    if (template) {
      return await this.mailerService.sendMail({
        to: to,
        subject: subject,
        template: template,
        context: context,
      });
    } else {
      return await this.mailerService.sendMail({
        to: to,
        subject: subject,
        html: html,
      });
    }
  }
}
