import {BadRequestException, ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { Role } from '../../generated/prisma/enums'
import { ILogin, IRegister } from '@/auth/interfaces/auth.interfaces';
import {MailService} from "@/mail/mail.service";
import { randomUUID } from "crypto";
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private mail: MailService) {}
  // @ts-ignore
  private readonly salt = +process.env.BCRYPT_SALT
  async register(dto: IRegister){
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    })
    if(existingUser) throw new ConflictException("User already exists");

    const hashedPassword = await bcrypt.hash(dto.password, this.salt);

    const user = await this.prisma.user.create({
      data:{
        email: dto.email,
        passwordHash: hashedPassword,
        name: dto.name,
        role: dto.role as Role,
      },
      select:{
        name: true,
        uuid:true
      }
    })
    return {
      message: 'User successfully registered!',
      user,
    };
  }

  async login(dto: ILogin){
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    })
    if (!user) throw new UnauthorizedException('Password or email not valid');

    const isPasswordMatches = await bcrypt.compare(dto.password, user.passwordHash)
    if (!isPasswordMatches)  throw new UnauthorizedException('Password or email not valid');

    const payload = {sub:user.uuid, email:user.email, role: user.role};

    const acessToken = await this.jwt.signAsync(payload);

    return {
      message: 'User successfully logged in',
      acessToken : acessToken,
    }
  }

  async sendResetCode(email: string){
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    })
    if (!user) throw new BadRequestException("Користувача не знайдено");

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await this.prisma.resetCode.upsert({
      where: {email: email},
      create: { email, code },
      update: { code, attempts: 0 },
    })
    await this.mail.sendResetCode(email, code)
  }

  async verifyResetCode(email: string, code: string){
    const record = await this.prisma.resetCode.findUnique({where: {email}})
    if (!record){
      throw new BadRequestException("Спочатку запросіть код");
    }
    if (record.attempts >= 5) {
      throw new BadRequestException("Забагато невдалих спроб. Спробуйте пізніше");
    }
    if(record.code !== code){
      await this.prisma.resetCode.update({
        where: {email},
        data: {attempts: record.attempts + 1}
      })
      throw new BadRequestException("Невірний код")
    }
    const resetToken = randomUUID();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await this.prisma.resetCode.update({
      where: {email},
      data: {resetToken: resetToken, resetTokenExpiresAt: expiresAt, attempts: 0},
    })
    return {resetToken: resetToken};
  }
  async resetPassword(resetToken: string, newPassword: string){
    const record = await this.prisma.resetCode.findFirst({
      where: {resetToken},
    })

    if (!record) throw new BadRequestException("Невірний або прострочений токен");

    if (!record.resetTokenExpiresAt || record.resetTokenExpiresAt < new Date()){
      throw new BadRequestException("Токен прострочений");
    }
    const hash = await bcrypt.hash(newPassword, this.salt);

    await this.prisma.user.update({
      where: { email: record.email },
      data: { passwordHash: hash },
    });
    
    await this.prisma.resetCode.delete({
      where: { email: record.email },
    });
    return {message: "Пароль зміненно"}
  }
}
