import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ProductsModule } from './products/products.module';
import { MailModule } from './mail/mail.module';
import { FeedbackModule } from './feedback/feedback.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { validationSchema } from '@/joi.env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      validationOptions: {abortEarly: false},
    }),
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 10,
    }]),
    PrismaModule,
    AuthModule,
    CloudinaryModule,
    ProductsModule,
    MailModule,
    FeedbackModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
