import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ required: false })
  @IsOptional()
  mainImage?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  gallery?: string[];
}
