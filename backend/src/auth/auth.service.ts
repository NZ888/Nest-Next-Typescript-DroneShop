import {ConflictException, Injectable} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt'
import { Role } from '../../generated/prisma/enums'
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  // @ts-ignore
  private readonly salt = +process.env.BCRYPT_SALT
  async register(dto: RegisterDto){
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
}
