import {Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import {RegisterDto} from "@/auth/dto/register.dto";
import { LoginDto } from '@/auth/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return await this.authService.register(dto);
  }
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }
  @Post('send-reset-code')
  sendResetCode(@Body() body: {email: string}){
    return this.authService.sendResetCode(body.email)
  }
  @Post('verify-reset-code')
  verifyResetCode(@Body() body: {email: string; code: string}){
    return this.authService.verifyResetCode(body.email, body.code)
  }
  @Post("reset-password")
  resetPassword(@Body() body : { resetToken: string; newPassword: string }){
    return this.authService.resetPassword(body.resetToken, body.newPassword)
  }
}
