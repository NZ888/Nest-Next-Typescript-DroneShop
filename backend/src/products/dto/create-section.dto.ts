import { IsString, IsOptional, IsInt, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateSectionDto {
  @IsString()
  @IsOptional()
  title?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  text?: string;
  @ApiProperty()
  @IsUrl()
  @IsOptional()
  image?: string;
  @ApiProperty()
  @IsUrl()
  @IsOptional()
  video?: string;
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  order: number;
}
