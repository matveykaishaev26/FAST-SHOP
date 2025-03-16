import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateColorDto } from './dto/create-color.dto';
@Injectable()
export class ColorService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateColorDto[]) {
    return await this.prisma.color.createMany({
      data: dto,
    });
  }

  async getAll() {
    const colors = await this.prisma.color.findMany({
      include: {
        productVariantColors: {
          select: {
            productVariantId: true,
          },
        },
      },
      orderBy: [
        {
          title: 'asc',
        },
      ],
    });

    return colors.map((color) => ({
      id: color.id,
      title: color.title,
      hex: color.hex,
      productCount: new Set(
        color.productVariantColors.map((v) => v.productVariantId),
      ).size, // Количество уникальных товаров
    }));
  }

  async delete(id: string) {
    await this.prisma.color.delete({ where: { id } });
    return 'Цвет удален!';
  }
  async update(id: string, dto: CreateColorDto) {
    await this.prisma.color.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }
}
