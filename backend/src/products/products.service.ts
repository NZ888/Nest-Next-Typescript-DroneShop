import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from '@/products/dto/create-product.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { CloudinaryService } from '@/cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService, private cloudinaryService: CloudinaryService) {}
  async createProduct(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: dto.name,
        slug: dto.slug,
        price: dto.price,
        oldPrice: dto.oldPrice,
        shortDesc: dto.shortDesc,
        mainImage: dto.mainImage,
        gallery: dto.gallery,
        videoUrl: dto.videoUrl,
        specs: dto.specs,
        sections: {
          create: dto.sections?.map((s) => ({
            title: s.title,
            text: s.text,
            image: s.image,
            video: s.video,
            order: s.order,
          })),
        },
      },
      include: { sections: true },
    });
  }
  async getAll(){
    return this.prisma.product.findMany({
      select: {
        name: true,
        price: true,
        oldPrice: true,
        mainImage: true,
        slug: true,
      }
    });
  }
  async getProductBySlug(slug: string){
    return this.prisma.product.findUnique({
      where: {slug: slug}
    })
  }
  async getSomeNewProducts(quantity: number) {
    const products = await this.prisma.product.findMany({
      select: {
        price: true,
        name: true,
        slug: true,
        mainImage: true,
        shortDesc: true,
      },
      take: quantity,
      orderBy: { id: "desc" },
    });

    if (products.length !== quantity) {
      throw new HttpException(
        `Expected ${quantity} products but found ${products.length}`,
        HttpStatus.NOT_FOUND
      );
    }

    return products;
  }
  async updateProduct(id: number, data: any) {
    return this.prisma.product.update({
      where: { id },
      data: {
        ...data,
        sections: data.sections
          ? {
            deleteMany: {},
            create: data.sections,
          }
          : undefined,
      },
      include: { sections: true },
    });
  }
  async deleteProduct(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { sections: true },
    });

    if (!product) throw new Error('Product not found');


    const allUrls: string[] = [];

    if (product.mainImage) allUrls.push(product.mainImage);
    if (product.gallery?.length) allUrls.push(...product.gallery);
    if (product.sections?.length) {
      product.sections.forEach((s) => s.image && allUrls.push(s.image));
    }

    for (const url of allUrls) {
      const publicId = this.cloudinaryService.extractPublicId(url);
      if (publicId) await this.cloudinaryService.deleteImage(publicId);
    }


    await this.prisma.section.deleteMany({ where: { productId: id } });
    return this.prisma.product.delete({ where: { id } });
  }
}
