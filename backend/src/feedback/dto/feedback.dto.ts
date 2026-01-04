import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class FeedbackDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(2)
    name: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsPhoneNumber("UA")
    @Length(5,60)
    phone: string;
    @ApiProperty()
    @Length(5,60)
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(1,1000)
    message: string;
}



