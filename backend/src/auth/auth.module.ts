import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy'; // 👈 добавь импорт

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // 👈 добавь defaultStrategy
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '20m' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy, // 👈 вот этого не хватало
  ],
  exports: [AuthService, JwtModule, PassportModule], // 👈 чтобы guard работал и в других модулях
})
export class AuthModule {}
