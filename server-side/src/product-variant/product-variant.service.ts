import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
@Injectable()
export class ProductVariantService {
  constructor(private prisma: PrismaService) {}
  async getAll() {
    return await this.prisma.productVariant.findMany();
  }

  async getPriceRange() {
    const result = await this.prisma.productVariant.aggregate({
      _min: {
        price: true,
      },
      _max: {
        price: true,
      },
    });
    return {
      minPrice: result._min.price,
      maxPrice: result._max.price,
    };
  }
  async create(dto: CreateProductVariantDto[]) {
    return await this.prisma.productVariant.createMany({
      data: dto,
    });
  }

  async delete(id: string) {
    await this.prisma.productVariant.delete({ where: { id } });
    return { message: 'Продукт удален' };
  }
}
