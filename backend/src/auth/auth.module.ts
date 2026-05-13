import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import {MailModule} from "@/mail/mail.module";
import { BullModule } from '@nestjs/bullmq';
import { SEND_EMAIL } from '@/auth/common/constants';
import { AuthProcessor } from '@/auth/auth.processor';

@Module({
  imports: [
      MailModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '20m' },
      }),
    }),
    BullModule.registerQueue({name:SEND_EMAIL})
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    AuthProcessor
  ],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
