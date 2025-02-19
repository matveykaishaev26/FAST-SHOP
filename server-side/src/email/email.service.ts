import { BadRequestException, Injectable } from '@nestjs/common';
import { Resend } from 'resend';
@Injectable()
export class EmailService {
  private resend: Resend;
  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendVerificationEmail(email: string, token: string) {
    const confirmLink = `${process.env.CLIENT_URL}/auth/new-verification?token=${token}`;
    try {
      await this.resend.emails.send({
        from: 'fastshop@resend.dev',
        to: [email],
        subject: 'Подтверждение почты',
        html: `<div><p><h1>Подтверждение почты</h1><a href="${confirmLink}">Нажми сюда</a> чтобы подтвердить почту</p></div>`,
      });
    } catch {
      throw new BadRequestException('Ошибка при отправке письма');
    }
  }

  async sendPasswordResend(email: string, token: string) {
    const confirmLink = `${process.env.CLIENT_URL}/auth/reset-password?token=${token}`;
    try {
      await this.resend.emails.send({
        from: 'fastshop@resend.dev',
        to: [email],
        subject: 'Изменения пароля',
        html: `<div><p><h1>Изменение пароля</h1><a href="${confirmLink}">Нажми сюда</a> чтобы изменить пароль</p></div>`,
      });
    } catch {
      throw new BadRequestException('Ошибка при отправке письма');
    }
  }
}
