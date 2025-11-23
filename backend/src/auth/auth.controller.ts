import {
  Body,
  Controller,
  Post,
  Res,
  Req,
  Get,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "@/auth/dto/register.dto";
import { LoginDto } from "@/auth/dto/login.dto";
import { Response, Request } from "express";
import { JwtAuthGuard } from "@/auth/jwt/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post("login")
  async login(
      @Body() dto: LoginDto,
      @Res({ passthrough: true }) res: Response
  ) {
    const data = await this.authService.login(dto);

    res.cookie("accessToken", data.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 15,
    });

    res.cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    return { message: "Logged in" };
  }

  @Post("refresh")
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies?.refreshToken;
    const data = await this.authService.refresh(token);

    res.cookie("accessToken", data.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 15,
    });

    return { message: "Refreshed" };
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return { message: "Logged out" };
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  me(@Req() req: Request) {

    // @ts-ignore
    return req.user;
  }

  @Post("send-reset-code")
  sendResetCode(@Body() body: { email: string }) {
    return this.authService.sendResetCode(body.email);
  }

  @Post("verify-reset-code")
  verifyResetCode(@Body() body: { email: string; code: string }) {
    return this.authService.verifyResetCode(body.email, body.code);
  }

  @Post("reset-password")
  resetPassword(@Body() body: { resetToken: string; newPassword: string }) {
    return this.authService.resetPassword(body.resetToken, body.newPassword);
  }
}
