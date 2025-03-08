import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateColorDto } from './dto/create-color.dto';
@Injectable()
export class ColorService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateColorDto) {
    return await this.prisma.color.create({
      data: {
        ...dto,
      },
    });
  }

  async getAll() {
    return await this.prisma.color.findMany();
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
