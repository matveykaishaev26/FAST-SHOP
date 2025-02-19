import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { ColorDto } from './dto/color.dto';
@Injectable()
export class ColorService {
  constructor(private prisma: PrismaService) {}
  async getById(colorId: string) {
    const color = await this.prisma.color.findUnique({
      where: {
        id: colorId,
      },
    });

    if (!color) {
      throw new NotFoundException('Цвет не найден!');
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

  async create(storeId, dto: ColorDto) {
    return this.prisma.color.create({
      data: {
        name: dto.name,
        value: dto.value,
        storeId,
      },
    });
  }

  async update(id: string, dto: ColorDto) {
    await this.getById(id);

    return this.prisma.color.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        value: dto.value,
      },
    });
  }

  async delete(id: string) {
    await this.getById(id);

    return this.prisma.color.delete({
      where: {
        id,
      },
    });
  }
}
