import {SEND_FEEDBACK_JOB, SEND_FEEDBACK_QUEUE} from "@/feedback/common/constants";
import {Processor, WorkerHost} from "@nestjs/bullmq";
import {Job} from "bullmq";
import {MailService} from "@/mail/mail.service";
import {PrismaService} from "@/prisma/prisma.service";
import {ISendFeedbackQueue} from "@/feedback/types/job";
import {Logger} from "@nestjs/common";

@Processor(SEND_FEEDBACK_QUEUE)
export class FeedbackProcessor extends WorkerHost{
    constructor(private mail: MailService, private prisma: PrismaService) {
        super();
    }
    private readonly logger: Logger = new Logger(FeedbackProcessor.name);
    async process(job:Job<ISendFeedbackQueue>){
        if(job.name === SEND_FEEDBACK_JOB){
            const count = await this.prisma.feedback.updateMany({
                where: {email: job.data.email, codeState: "NOT_EVEN_SEND"},
                data: {
                    codeState: "SENDING"
                }
            })
            if(count.count === 0){
                this.logger.log("Sending...");
            }
            const {email, message, phone, name} = job.data;
            await this.mail.sendFeedbackToAdminsEmail(email, message, phone, name)
        }
    }
}
