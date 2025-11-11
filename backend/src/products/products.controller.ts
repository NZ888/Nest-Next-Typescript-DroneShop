import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@/auth/jwt/jwt-auth.guard';
import { Roles } from '@/auth/roles/roles.decorator';
import { Role } from '../../generated/prisma/enums';
import { CloudinaryService } from '@/cloudinary/cloudinary.service';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'mainImage', maxCount: 1 },
      { name: 'gallery', maxCount: 10 },
      { name: 'sectionImages', maxCount: 20 },
    ]),
  )
  async createProduct(
    @Body('data') data: string,
    @UploadedFiles()
    files: {
      mainImage?: Express.Multer.File[];
      gallery?: Express.Multer.File[];
      sectionImages?: Express.Multer.File[];
    },
  ) {

    const parsed: CreateProductDto = JSON.parse(data);


    let mainImage: string | undefined = undefined;
    if (files.mainImage?.[0]) {
      const uploaded = await this.cloudinaryService.uploadImage(
        files.mainImage[0],
      );
      mainImage = uploaded.secure_url;
    }


    const gallery: string[] = [];
    if (files.gallery?.length) {
      for (const file of files.gallery) {
        const uploaded = await this.cloudinaryService.uploadImage(file);
        gallery.push(uploaded.secure_url);
      }
    }


    let sections = parsed.sections || [];
    if (sections.length && files.sectionImages?.length) {
      sections = await Promise.all(
        sections.map(async (section, index) => {
          const sectionFile = files.sectionImages?.[index];
          if (sectionFile) {
            const uploaded = await this.cloudinaryService.uploadImage(
              sectionFile,
            );
            return {
              ...section,
              image: uploaded.secure_url,
            };
          }
          return section;
        }),
      );
    }


    const finalDto: CreateProductDto = {
      ...parsed,
      mainImage,
      gallery,
      sections,
    };


    return this.productsService.createProduct(finalDto);
  }
  @Post('example')
  @ApiOperation({ summary: 'Product schema' })
  @ApiBody({ type: CreateProductDto })
  createExample(@Body() body: CreateProductDto) {
    return body;
  }

}
