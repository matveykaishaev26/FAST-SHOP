import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async getById(colorId: string) {
    const color = await this.prisma.color.findUnique({
      where: {
        id: colorId,
      },
    });

    if (!color) {
      throw new NotFoundException('Категория не найдена!');
    }

    return color;
  }

  async getByStoreId(storeId: string) {
    return await this.prisma.color.findMany({
      where: {
        storeId,
      },
    });
  }

  async create(storeId, dto: CategoryDto) {
    return this.prisma.category.create({
      data: {
        title: dto.title,
        description: dto.description,
        storeId,
      },
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
        description: dto.description,
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
