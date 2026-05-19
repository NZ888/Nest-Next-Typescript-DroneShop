import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { MailModule } from '@/mail/mail.module';
import { BullModule } from '@nestjs/bullmq';
import {

  SEND_FEEDBACK_QUEUE,
} from '@/feedback/common/constants';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService],
  imports: [MailModule, BullModule.registerQueue({name: SEND_FEEDBACK_QUEUE})],
})
export class FeedbackModule {}
