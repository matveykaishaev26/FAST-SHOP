import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const result = await this.prisma.category.findMany({
      include: {
        products: {
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

    return result.map((item) => ({
      id: item.id,
      title: item.title,
      productCount: new Set(item.products.map((v) => v.id)).size,
    }));
  }
  async getById(id: string) {
    const color = await this.prisma.category.findUnique({
      where: {
        id: id,
      },
    });

    if (!color) {
      throw new NotFoundException('Категория не найдена!');
    }

    return color;
  }

  async create(dto: CategoryDto[]) {
    return this.prisma.category.createMany({
      data: dto,
    });
  }

  async update(id: string, dto: CategoryDto) {
    await this.getById(id);

    return this.prisma.category.update({
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

    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
