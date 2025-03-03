import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBrandDto } from './dto/create-brand.dto';
@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.brand.findMany();
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

  async create(dto: CreateBrandDto) {
    return this.prisma.brand.create({
      data: {
        title: dto.title,
      },
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
