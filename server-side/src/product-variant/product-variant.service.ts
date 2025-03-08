import { Injectable } from '@nestjs/common';
import { ProductVariant } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
@Injectable()
export class ProductVariantService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.productVariant.findMany();
  }

  async create(dto: CreateProductVariantDto) {
    return await this.prisma.productVariant.create({
      data: {
        price: dto.price,
        productId: dto.productId,
        images: dto.images,
      },
    });
  }

  async delete(id: string) {
    await this.prisma.productVariant.delete({ where: { id } });
    return { message: 'Продукт удален' };
  }
}
