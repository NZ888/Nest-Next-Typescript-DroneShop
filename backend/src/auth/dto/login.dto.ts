import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @Length(5,60)
  email: string;
  @Length(5,60)
  @IsNotEmpty()
  @IsString()
  password: string;
}