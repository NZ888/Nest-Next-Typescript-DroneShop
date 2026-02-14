import {BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
import {CreateProductDto} from '@/products/dto/create-product.dto';
import {PrismaService} from '@/prisma/prisma.service';
import {CloudinaryService} from '@/cloudinary/cloudinary.service';
import {SetProductCategoriesDto} from '@/products/dto/set-product-category.dto';
import {CreateCategoryDto} from '@/products/dto/create-category.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService, private cloudinaryService: CloudinaryService) {}
  async createProduct(dto: CreateProductDto) {
      const sections = (dto.sections ?? [])
          .filter((s: any) => s && (s.title || s.text || s.image || s.video) && s.order !== undefined && s.order !== null)
          .map((s: any) => ({ ...s, order: Number(s.order) }));

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
        specs: dto.specs, sections: sections.length ? { create: sections } : undefined,
        categories: dto.categories?.length
          ? {
            connectOrCreate: dto.categories.map((c) => ({
              where: { slug: c.slug },
              create: { name: c.name, slug: c.slug, image: c.image },
            })),
          }
          : undefined,
      },
      include: { sections: true },
    });
  }
  async getAll(page: number = 1, limit: number = 16){
      const skip : number = (page - 1) * limit
      const [products, total] = await Promise.all([
          this.prisma.product.findMany({
              skip: skip,
              take: limit,
              orderBy: {createdAt:"desc"},
              include: {
                  categories: true
              }
          }),
          this.prisma.product.count()
      ])
      const totalPages: number = Math.ceil(total / limit);
      return {
        message: products.length
          ? 'List of all products'
          : 'No products found.',
        status: products.length ? HttpStatus.OK : HttpStatus.NOT_FOUND,
        pagination: {
          page: page,
          limit: limit,
          totalPages: totalPages,
        },
        data: {
          products: products,
        },
      };
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
          oldPrice: true,
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
  async setCategories(productSlug: string, dto: SetProductCategoriesDto){
    const product = await this.prisma.product.findUnique({
      where: {slug: productSlug}
    })
    if (!product) throw new NotFoundException("Product not found");

    const existing = await this.prisma.category.findMany({
      where: {id: {in: dto.categoryIds}},
      select: {id: true}
    })
    if (existing.length !== dto.categoryIds.length) {
      throw new NotFoundException("Some categories not found");
    }
    return this.prisma.product.update({
      where: { slug: productSlug },
      data: {
        categories: {
          set: dto.categoryIds.map((id) => ({ id }))
        },
      },
      include: { categories: true },
    });
  }
  async addCategories(productSlug: string, dto: SetProductCategoriesDto){
    return this.prisma.product.update({
      where: {slug: productSlug},
      data: {
        categories: {
          connect: dto.categoryIds.map((id) => ({ id })),
        }
      },
      include: { categories: true },
    })
  }
  async createCategory(dto:CreateCategoryDto){
    const exist = await this.prisma.category.findUnique({
      where:{slug: dto.slug}
    })
    if (exist) throw new BadRequestException("Category already exist");
    return this.prisma.category.create({
        data:{
          name: dto.name,
          slug: dto.slug,
          image: dto.image
        },
      include: {products: true}
    })
  }
  async deleteCategory(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!category) throw new NotFoundException("Category not found");


    const products = await this.prisma.product.findMany({
      where: { categories: { some: { id: category.id } } },
      select: { id: true },
    });


    await this.prisma.$transaction([
      ...products.map((p) =>
        this.prisma.product.update({
          where: { id: p.id },
          data: {
            categories: {
              disconnect: { id: category.id },
            },
          },
        })
      ),
      this.prisma.category.delete({ where: { slug } }),
    ]);

    return { ok: true };
  }
  async getAllCategories() {

      return this.prisma.category.findMany({
          select: {
              name: true,
              slug: true,
              id: true,
              image: true,
              products: true,
          },
      });
  }
}
