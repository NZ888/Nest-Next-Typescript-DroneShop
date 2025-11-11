import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '@/products/dto/create-product.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
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
}
