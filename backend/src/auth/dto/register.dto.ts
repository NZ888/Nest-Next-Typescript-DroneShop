import {IsEmail, IsEnum, IsNotEmpty, IsString, Length} from 'class-validator';
import { Role } from '../../../generated/prisma/enums'
import {Transform} from "class-transformer";
export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  password: string;
  @IsNotEmpty()
  @IsEnum(Role)
  @Transform(({ value }) => value.toUpperCase())
  role: string;
}
