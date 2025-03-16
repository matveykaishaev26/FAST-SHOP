import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductVariantQuantityDto } from './dto/create-product-variant-quantity.dto';

@Injectable()
export class ProductVariantQuantityService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.productVariantQuantity.findMany();
  }

  async create(dto: CreateProductVariantQuantityDto[]) {
    return await this.prisma.productVariantQuantity.createMany({
      data: dto,
    });
  }

  async delete(id: string) {
    return await this.prisma.productVariantQuantity.delete({
      where: {
        id,
      },
    });
  }
}
