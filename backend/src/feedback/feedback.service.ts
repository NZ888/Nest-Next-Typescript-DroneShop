import { HttpStatus, Injectable } from '@nestjs/common';
import {PrismaService} from "@/prisma/prisma.service";
import {FeedbackDto} from "@/feedback/dto/feedback.dto";
import {MailService} from "@/mail/mail.service";

@Injectable()
export class FeedbackService {
    constructor(private prisma: PrismaService, private mailService: MailService) {}

    async pushFeedback(feedback: FeedbackDto){
        const saved = await this.prisma.feedback.create({
            data: {
                name: feedback.name,
                phone: feedback.phone,
                message: feedback.message,
                email: feedback.email
            },
        });
        await this.mailService.sendFeedbackToAdminsEmail(feedback.email, feedback.message, feedback.phone, feedback.name);

        return saved;
    }
    async getAllFeedbacks(page: number = 1, limit: number = 5){
        const skip: number = (page - 1) * limit;
        const [feedbacks, total] = await Promise.all([
            this.prisma.feedback.findMany({
                skip: skip,
                take: limit,
                orderBy: {createdAt: "desc"}
            }),
            this.prisma.feedback.count()
        ])
        const totalPages: number = Math.ceil(total / limit);
        return {
            message: feedbacks.length ? 'List of all feedbacks' : 'No feedbacks found.',
            status: feedbacks.length ? HttpStatus.OK : HttpStatus.NOT_FOUND,
            pagination:{
                page: `Page ${page}`,
                limit: `Limit: ${limit}`,
                totalPages: `Total ${totalPages}`,
            },
            data:{
              feedbacks: feedbacks,
            }
        }
    }
}
