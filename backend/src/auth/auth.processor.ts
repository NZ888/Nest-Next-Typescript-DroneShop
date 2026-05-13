import { Processor, WorkerHost } from '@nestjs/bullmq';
import { SEND_EMAIL, SEND_EMAIL_CONFIRM_JOB, SEND_RESET_CODE_JOB } from '@/auth/common/constants';
import {Job} from "bullmq";
import { ISendEmailJob } from '@/auth/interfaces/job.interface';
import { MailService } from '@/mail/mail.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Logger } from '@nestjs/common';

@Processor(SEND_EMAIL)
export class AuthProcessor extends WorkerHost {
  constructor(private mail: MailService, private prisma: PrismaService) {
    super();
  }
  private readonly logger: Logger = new Logger(AuthProcessor.name);
  async process(job: Job<ISendEmailJob>) {
    if(job.name === SEND_RESET_CODE_JOB && job.id === job.data.userId){
        const count = await this.prisma.resetCode.updateMany({
          where: {email: job.data.email, codeState: "NOT_EVEN_SEND"},
          data: {
            codeState: "SENDING"
          }
        })
      if(count.count === 0){
        this.logger.log("Sending...")
      }
      const email: string = job.data.email
      const code: string = job.data.code
      await this.mail.sendResetCode(email, code)
      this.logger.log("Reset code send successfully")
    }

    if(job.name === SEND_EMAIL_CONFIRM_JOB && job.id === job.data.email){
      const count = await this.prisma.confirmEmailCode.updateMany({
        where: {email: job.data.email, codeState: "NOT_EVEN_SEND"},
        data: {
          codeState: "SENDING"
        }
      })
      if(count.count === 0){
        this.logger.log("Sending...")
      }
      const email: string = job.data.email
      const code: string = job.data.code
      await this.mail.sendEmailConfirm(email, code)
      this.logger.log("Confirm code send successfully")
    }
  }
}