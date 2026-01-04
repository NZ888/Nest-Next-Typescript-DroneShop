import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackDto } from '@/feedback/dto/feedback.dto';
import { Throttle } from '@nestjs/throttler';
import { JwtAuthGuard } from '@/auth/jwt/jwt-auth.guard';
import { Roles } from '@/auth/roles/roles.decorator';
import { Role } from '../../generated/prisma/enums';
import { GetFeedbackDto } from '@/feedback/dto/get.feedback.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post("send")
  @Throttle({ default: { limit: 3, ttl: 24 * 60 * 60 * 1000 } })
  pushFeedback(@Body() feedbackDto: FeedbackDto){
    this.feedbackService.pushFeedback(feedbackDto)
  }

  @Get("get")
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async getAllFeedbacks(@Query() query:GetFeedbackDto){
    const page:number = Number(query.page);
    const limit:number = Number(query.limit);
    return this.feedbackService.getAllFeedbacks(page, limit);
  }
}
