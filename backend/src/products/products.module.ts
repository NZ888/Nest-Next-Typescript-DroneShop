import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { CloudinaryModule } from '@/cloudinary/cloudinary.module';
import { RedisModule } from '@/redis/redis.module';


@Module({
  imports: [CloudinaryModule, RedisModule],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class ProductsModule {}
