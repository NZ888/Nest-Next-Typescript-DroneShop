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
  HttpException,
  Put,
  BadRequestException,
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
import {GetProductsDto} from "@/products/dto/get.products.dto";

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
    @Body() dto: CreateProductDto,
    @UploadedFiles() files: {
      mainImage?: Express.Multer.File[];
      gallery?: Express.Multer.File[];
      sectionImages?: Express.Multer.File[];
    },
  ) {

    dto.price = Number(dto.price);
    if (dto.oldPrice !== undefined) dto.oldPrice = Number(dto.oldPrice);


    let mainImage: string | undefined;
    if (files.mainImage?.[0]) {
      const uploaded = await this.cloudinaryService.uploadImage(files.mainImage[0]);
      mainImage = uploaded.secure_url;
    }


    const gallery: string[] = [];
    if (files.gallery?.length) {
      const uploads = await Promise.all(files.gallery.map(f => this.cloudinaryService.uploadImage(f)));
      gallery.push(...uploads.map(u => u.secure_url));
    }


    let sections = dto.sections ?? [];
    if (sections.length && files.sectionImages?.length) {
      sections = await Promise.all(
        sections.map(async (section, index) => {
          const file = files.sectionImages?.[index];
          if (!file) return section;
          const uploaded = await this.cloudinaryService.uploadImage(file);
          return { ...section, image: uploaded.secure_url };
        }),
      );
    }
    console.log('SECTIONS AFTER PARSE:', dto.sections);

    return this.productsService.createProduct({
      ...dto,
      mainImage: mainImage ?? null,
      gallery,
      sections,
    });
  }

  @Post('example')
  @ApiOperation({ summary: 'Product schema' })
  @ApiBody({ type: CreateProductDto })
  createExample(@Body() body: CreateProductDto) {
    return body;
  }
  @Get()
  async getAllProducts(@Query() query: GetProductsDto) {
      const page:number = Number(query.page);
      const limit:number = Number(query.limit);
      return this.productsService.getAll(page, limit);
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
    @Get("categories")
    async getAllCategories() {
        return this.productsService.getAllCategories();
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
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  async setCategories(@Param('slug') slug: string, @Body() dto: SetProductCategoriesDto) {
    return this.productsService.setCategories(slug, dto);
  }

  @Patch(":slug/categories")
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async addCategoriesToExists(@Param('slug') slug: string, @Body() dto: SetProductCategoriesDto) {
    return this.productsService.addCategories(slug, dto);
  }


  @Post("categories")
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(
    FileFieldsInterceptor([
      {name: "image", maxCount: 1}
    ])
  )
  async createCategory(@Body() dto: CreateCategoryDto, @UploadedFiles() files: {image: Express.Multer.File[]})
  {
    let imageUrl: string | undefined = undefined;
    if (files.image?.[0]) {
      const uploaded = await this.cloudinaryService.uploadImage(
        files.image[0],
      );
      imageUrl = uploaded.secure_url;
      if (!imageUrl) {
          throw new BadRequestException('Cloudinary did not return image URL');
      }
    }
    if (!files?.image?.[0]) {
      throw new BadRequestException('Image is required');
    }

      const updatedData = {
      ...dto,
      image: imageUrl,
    }
      return this.productsService.createCategory(updatedData);
  }


  @Delete("categories/:slug")
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async deleteCategory(@Param('slug') slug: string) {

    return this.productsService.deleteCategory(slug);
  }

}
