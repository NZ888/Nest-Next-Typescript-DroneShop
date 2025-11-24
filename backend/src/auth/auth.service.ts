import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Role } from '../../generated/prisma/enums'
import { ILogin, IRegister } from "@/auth/interfaces/auth.interfaces";
import { MailService } from "@/mail/mail.service";
import { randomUUID } from "crypto";

@Injectable()
export class AuthService {
  constructor(
      private prisma: PrismaService,
      private jwt: JwtService,
      private mail: MailService
  ) {}

  // @ts-ignore
  private readonly salt = +process.env.BCRYPT_SALT;


  async register(dto: IRegister & { confirmToken: string }) {
    const record = await this.prisma.confirmEmailCode.findUnique({
      where: { email: dto.email }
    });

    if (!record || record.confirmToken !== dto.confirmToken)
      throw new BadRequestException("Пошта не підтверджена");

    if (!record.confirmTokenExpiresAt || record.confirmTokenExpiresAt < new Date())
      throw new BadRequestException("Токен підтвердження прострочений");


    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exists)
      throw new ConflictException("Користувач вже існує");

    const passwordHash = await bcrypt.hash(dto.password, this.salt);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        passwordHash,
        role: dto.role as Role
      },
      select: { uuid: true, name: true }
    });

    await this.prisma.confirmEmailCode.delete({
      where: { email: dto.email }
    });

    return {
      message: "User successfully registered",
      user
    };
  }


  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) return null;

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return null;

    return user;
  }


  async login(dto: ILogin) {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) throw new UnauthorizedException("Email або пароль невірні");

    const payload = {
      sub: user.uuid,
      email: user.email,
      role: user.role
    };


    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: "15m"
    });


    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: "30d"
    });

    return {
      message: "Logged in",
      accessToken,
      refreshToken
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwt.verifyAsync(refreshToken);

      const newAccess = await this.jwt.signAsync(
          {
            sub: payload.sub,
            email: payload.email,
            role: payload.role
          },
          { expiresIn: "15m" }
      );

      return { accessToken: newAccess };
    } catch {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }
  }


  async sendResetCode(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) throw new BadRequestException("Користувача не знайдено");

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await this.prisma.resetCode.upsert({
      where: { email },
      create: { email, code },
      update: { code, attempts: 0 }
    });

    await this.mail.sendResetCode(email, code);

    return { message: "Код надіслано" };
  }

  async verifyResetCode(email: string, code: string) {
    const record = await this.prisma.resetCode.findUnique({ where: { email } });

    if (!record)
      throw new BadRequestException("Спочатку запросіть код");

    if (record.attempts >= 5)
      throw new BadRequestException("Забагато невдалих спроб");

    if (record.code !== code) {
      await this.prisma.resetCode.update({
        where: { email },
        data: { attempts: record.attempts + 1 }
      });
      throw new BadRequestException("Невірний код");
    }

    const resetToken = randomUUID();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await this.prisma.resetCode.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiresAt: expiresAt,
        attempts: 0
      }
    });

    return { resetToken };
  }

  async resetPassword(resetToken: string, newPassword: string) {
    const record = await this.prisma.resetCode.findFirst({
      where: { resetToken }
    });

    if (!record)
      throw new BadRequestException("Невірний або прострочений токен");

    if (!record.resetTokenExpiresAt || record.resetTokenExpiresAt < new Date())
      throw new BadRequestException("Токен прострочений");

    const hash = await bcrypt.hash(newPassword, this.salt);

    await this.prisma.user.update({
      where: { email: record.email },
      data: { passwordHash: hash }
    });

    await this.prisma.resetCode.delete({
      where: { email: record.email }
    });

    return { message: "Пароль змінено" };
  }

  async sendEmailConfirmCode(email: string) {
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser)
      throw new BadRequestException("Користувач вже існує");

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await this.prisma.confirmEmailCode.upsert({
      where: { email },
      create: { email, code, attempts: 0 },
      update: { code, attempts: 0 }
    });

    await this.mail.sendEmailConfirm(email, code);
    return { message: "Код надіслано" };
  }


  async verifyEmailConfirmCode(email: string, code: string) {
    const record = await this.prisma.confirmEmailCode.findUnique({ where: { email } });

    if (!record)
      throw new BadRequestException("Спочатку запросіть код");

    if (record.attempts >= 5)
      throw new BadRequestException("Забагато невдалих спроб");

    if (record.code !== code) {
      await this.prisma.confirmEmailCode.update({
        where: { email },
        data: { attempts: record.attempts + 1 }
      });
      throw new BadRequestException("Невірний код");
    }

    const confirmToken = randomUUID();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await this.prisma.confirmEmailCode.update({
      where: { email },
      data: {
        confirmToken,
        confirmTokenExpiresAt: expiresAt,
        attempts: 0
      }
    });

    return { confirmToken };
  }

}


