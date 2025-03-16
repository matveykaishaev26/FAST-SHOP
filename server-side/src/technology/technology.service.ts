import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTechnologyDto } from './dto/create-technology.dto';
@Injectable()
export class TechnologyService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.technology.findMany();
  }
  async getById(id: string) {
    const color = await this.prisma.technology.findUnique({
      where: {
        id: id,
      },
    });

    if (!color) {
      throw new NotFoundException('Категория не найдена!');
    }

    return color;
  }

  async create(dto: CreateTechnologyDto[]) {
    return this.prisma.technology.createMany({
      data: dto,
    });
  }

  async update(id: string, dto: CreateTechnologyDto) {
    await this.getById(id);

    return this.prisma.technology.update({
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

    return this.prisma.technology.delete({
      where: {
        id,
      },
    });
  }
}
