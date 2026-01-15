import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  HttpException, Put,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@/auth/jwt/jwt-auth.guard';
import { Roles } from '@/auth/roles/roles.decorator';
import { Role } from '../../generated/prisma/enums';
import { CloudinaryService } from '@/cloudinary/cloudinary.service';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { UpdateProductDto } from '@/products/dto/update-product.dto';
import { SetProductCategoriesDto } from '@/products/dto/set-product-category.dto';
import { CreateCategoryDto } from '@/products/dto/create-category.dto';

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
  @Get()
  async getAllProducts(){
    return this.productsService.getAll();
  }
  @Get("new")
  async getSomeNewProducts(@Query('quantity') quantity: string) {
      const num = Number(quantity);

      if (Number.isNaN(num)) {
          throw new HttpException("quantity must be a valid number", 400);
      }

      return this.productsService.getSomeNewProducts(num);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'mainImage', maxCount: 1 },
      { name: 'gallery', maxCount: 10 },
      { name: 'sectionImages', maxCount: 20 },
    ]),
  )
  async updateProduct(
    @Param('id') id: string,
    @Body('data') data: string,
    @UploadedFiles()
    files: {
      mainImage?: Express.Multer.File[];
      gallery?: Express.Multer.File[];
      sectionImages?: Express.Multer.File[];
    },
  ) {
    const parsed: UpdateProductDto = data ? JSON.parse(data) : {};

    let mainImage: string | undefined;
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
          const file = files.sectionImages?.[index];
          if (file) {
            const uploaded = await this.cloudinaryService.uploadImage(file);
            return {
              ...section,
              image: uploaded.secure_url,
            };
          }
          return section;
        }),
      );
    }

    const updateData = {
      ...parsed,
      ...(mainImage ? { mainImage } : {}),
      ...(gallery.length ? { gallery } : {}),
      ...(sections.length ? { sections } : {}),
    };

    return this.productsService.updateProduct(+id, updateData);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(+id);
  }

  @Get(":slug")
  async getProductBySlug(@Param('slug') slug: string) {
    return this.productsService.getProductBySlug(slug);
  }

  @Put(":slug/categories")
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async setCategories(@Param('slug') slug: string, @Body() dto: SetProductCategoriesDto) {
    return this.productsService.setCategories(slug, dto);
  }

  @Patch(":slug/categories")
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async addCategoriesToExists(@Param('slug') slug: string, dto: SetProductCategoriesDto) {
    return this.productsService.addCategories(slug, dto);
  }

  @Post("categories")
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async createCategory(@Body() dto: CreateCategoryDto) {
    return this.productsService.createCategory(dto);
  }
  @Delete("categories/:slug")
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async deleteCategory(@Param('slug') slug: string) {
    return this.productsService.deleteCategory(slug);
  }
}
