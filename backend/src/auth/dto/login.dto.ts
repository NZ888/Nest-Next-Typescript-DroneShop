import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Length(5,60)
  email: string;
  @ApiProperty()
  @Length(5,60)
  @IsNotEmpty()
  @IsString()
  password: string;
}