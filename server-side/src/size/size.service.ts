import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSizeDto } from './dto/create-size.dto';

@Injectable()
export class SizeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSizeDto[]) {
    return await this.prisma.size.createMany({
      data: dto,
    });
  }

  async getAll() {
    const result = await this.prisma.size.findMany({
      include: {
        productVariantQuantity: {
          select: {
            productVariant: {
              select: {
                id: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          title: 'asc',
        },
      ],
    });
    return result.map((item) => ({
      id: item.id,
      title: item.title.toString(),
      productCount: new Set(
        item.productVariantQuantity.map((v) => v.productVariant.id),
      ).size, // Количество уникальных товаров
    }));
  }

  async delete(id: string) {
    await this.prisma.color.delete({ where: { id } });
    return 'Цвет удален!';
  }
  async update(id: string, dto: CreateSizeDto) {
    await this.prisma.size.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }
}
