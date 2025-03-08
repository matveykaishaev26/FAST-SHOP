import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSizeDto } from './dto/create-size.dto';

@Injectable()
export class SizeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSizeDto) {
    return await this.prisma.size.create({
      data: {
        ...dto,
      },
    });
  }

  async getAll() {
    return await this.prisma.size.findMany();
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
