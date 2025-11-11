import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSectionDto } from './create-section.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  slug: string;
  @ApiProperty()
  @IsNumber()
  price: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  oldPrice?: number;
  @ApiProperty()
  @IsString()
  @IsOptional()
  shortDesc?: string;
  @ApiProperty()
  @IsUrl()
  @IsOptional()
  mainImage?: string | null;
  @ApiProperty()
  @IsArray()
  @IsOptional()
  gallery?: string[];
  @ApiProperty()
  @IsUrl()
  @IsOptional()
  videoUrl?: string;
  @ApiProperty()
  @IsOptional()
  specs?: Record<string, any>;
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => CreateSectionDto)
  @IsOptional()
  sections?: CreateSectionDto[];
}
