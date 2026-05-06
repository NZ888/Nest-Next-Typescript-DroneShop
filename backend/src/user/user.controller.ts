import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '@/auth/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("info/:userId")
  async getUserInfo(@Param("userId") userId: string){
    const user = await this.userService.getUserInfo(userId);
    return user;
  }
}
