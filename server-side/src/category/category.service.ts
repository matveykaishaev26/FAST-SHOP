import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.category.findMany();
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

  async create(dto: CategoryDto) {
    return this.prisma.category.create({
      data: {
        title: dto.title,
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
