import {IsEmail, IsEnum, IsNotEmpty, IsString, Length} from 'class-validator';
import { Role } from '../../../generated/prisma/enums'
import {Transform} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";
export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  name: string;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  @ApiProperty()
  password: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Role)
  @Transform(({ value }) => value.toUpperCase())
  role: Role;
}
