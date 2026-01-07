import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { MailModule } from '@/mail/mail.module';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService],
  imports: [MailModule],
})
export class FeedbackModule {}
