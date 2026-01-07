import {Injectable, Logger} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);
    private transporter: nodemailer.Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'localhost',
            port: 1025,
            secure: false,
        })
    }
    async sendResetCode(email: string, code: string) {
        await this.transporter.sendMail({
            from: '"DroneShop" <no-reply@droneshop.local>',
            to: email,
            subject: "Код для відновлення пароля",
            text: `Ваш код для відновлення пароля: ${code}`,
            html: `<p>Ваш код для відновлення пароля:</p><h1>${code}</h1>`,
        })
        this.logger.log(`Reset code ${code} sent to ${email}`);
    }
    async sendEmailConfirm(email: string, code: string) {
        await this.transporter.sendMail({
            from: '"DroneShop" <no-reply@droneshop.local>',
            to: email,
            subject: "Код для підтверження email адреси",
            text: `Ваш код для підтверження email: ${code}`,
            html: `<p>Ваш код для підтверження email:</p><h1>${code}</h1>`,
        })
        this.logger.log(`email code ${code} sent to ${email}`);
    }
    async sendFeedbackToAdminsEmail(email: string, message: string, phone: string, name: string) {
      await this.transporter.sendMail({
        from: '"DroneShop" <no-reply@droneshop.local>',
        to: '"DroneShop" <no-reply@droneshop.local>',
        subject: `Юзер ${name} надіслав фідбек повідомлення`,
        text: `Юзер ${name} надіслав фідбек повідомлення`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color:#f9fafb; padding:20px; border-radius:8px;">
            <h2 style="
              margin:0 0 12px 0;
              font-size:20px;
              color:#111827;
            ">
              Юзер ${name} надіслав фідбек повідомлення
            </h2>
          
            <p style="
              margin:0 0 16px 0;
              font-size:15px;
              color:#374151;
              line-height:1.5;
            ">
              ${message}
            </p>
          
            <p style="
              margin:0 0 6px 0;
              font-size:14px;
              color:#1f2937;
            ">
              <strong>Електронна адреса:</strong> ${email}
            </p>
          
            <p style="
              margin:0;
              font-size:14px;
              color:#1f2937;
            ">
              <strong>Телефон:</strong> ${phone}
            </p>

        </div>`,

      })
    }
}
