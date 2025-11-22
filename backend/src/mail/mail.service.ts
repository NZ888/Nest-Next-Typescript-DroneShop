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
}
