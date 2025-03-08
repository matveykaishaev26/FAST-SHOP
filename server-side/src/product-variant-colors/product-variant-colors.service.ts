import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductVariantColorsDto } from './dto/create-product-variant-colors.dto';
@Injectable()
export class ProductVariantColorsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductVariantColorsDto) {
    return await this.prisma.productVariantColors.create({
      data: {
        ...dto,
      },
    });
  }

  async getAll() {
    return await this.prisma.productVariantColors.findMany();
  }

  async delete(id: string) {
    await this.prisma.color.delete({ where: { id } });
    return 'Цвет удален!';
  }
  async update(id: string, dto: CreateProductVariantColorsDto) {
    await this.prisma.productVariantColors.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }
}
