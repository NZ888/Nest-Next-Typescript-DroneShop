import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { Role } from '../../generated/prisma/enums'
import { ILogin, IRegister } from '@/auth/interfaces/auth.interfaces';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
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
}
