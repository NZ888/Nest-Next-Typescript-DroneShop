import {ApiProperty} from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    name!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-z0-9-]+$/)
    slug!: string;

    @ApiProperty()
    // @IsUrl()
    image?: string;
}