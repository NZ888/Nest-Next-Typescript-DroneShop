import { IsArray, IsOptional, ValidateNested, IsUrl, IsString, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ToJsonArrayOf, ToJsonValue } from '@/../helpers';
import { CreateSectionDto } from './create-section.dto';
import { CreateCategoryDto } from './create-category.dto';

const ToOptionalNumber = () =>
  Transform(({ value }) => {
    if (value === '' || value === undefined || value === null) return undefined;
    const n = Number(value);
    return Number.isFinite(n) ? n : undefined;
  }, { toClassOnly: true });

export class CreateProductDto {
  @IsString() name: string;
  @IsString() slug: string;

  @ToOptionalNumber()
  @IsNumber()
  price: number;

  @ToOptionalNumber()
  @IsOptional()
  @IsNumber()
  oldPrice?: number;

  @IsOptional()
  @IsString()
  shortDesc?: string;

  @IsOptional()
  @IsUrl()
  mainImage?: string | null;

  @IsOptional()
  @IsArray()
  gallery?: string[];

  @IsOptional()
  @IsUrl()
  videoUrl?: string;

  @ToJsonValue()
  @IsOptional()
  @IsArray()
  specs?: Array<{
    key: string;
    labelUk: string;
    value: string | number | boolean;
    unit?: string;
    type?: 'text' | 'number' | 'bool';
    order?: number;
  }>;

  @ToJsonArrayOf(CreateSectionDto)
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  sections?: CreateSectionDto[];

  @ToJsonArrayOf(CreateCategoryDto)
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  categories?: CreateCategoryDto[];
}
