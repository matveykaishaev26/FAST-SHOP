import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBrandDto } from './dto/create-brand.dto';
@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async getBrands(skip: number, take: number) {
    skip = Math.max(skip, 0);
    const brands = await this.prisma.brand.findMany({
      skip,
      take,
      orderBy: [
        {
          title: 'asc',
        },
      ],
    });

    const total = await this.prisma.brand.count(); // Всего брендов

    return {
      brands,
      total,
    };
  }
  async getAll() {
    const brands = await this.prisma.brand.findMany({
      include: {
        product: {
          select: {
            id: true,
          },
        },
      },
      orderBy: [
        {
          title: 'asc',
        },
      ],
    });

    return brands.map((item) => ({
      id: item.id,
      title: item.title,
      productCount: new Set(item.product.map((v) => v.id)).size,
    }));
  }
  async getById(id: string) {
    const color = await this.prisma.brand.findUnique({
      where: {
        id: id,
      },
    });

    if (!color) {
      throw new NotFoundException('Категория не найдена!');
    }

    return color;
  }

  async create(dto: CreateBrandDto[]) {
    return this.prisma.brand.createMany({
      data: dto,
    });
  }

  async update(id: string, dto: CreateBrandDto) {
    await this.getById(id);

    return this.prisma.brand.update({
      where: {
        id,
      },
      data: {
        title: dto.title,
      },
    });
  }

  async delete(id: string) {
    await this.getById(id);

    return this.prisma.brand.delete({
      where: {
        id,
      },
    });
  }
}
