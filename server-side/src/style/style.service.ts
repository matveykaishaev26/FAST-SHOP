import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStyleDto } from './dto/create-style.dto';

@Injectable()
export class StyleService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateStyleDto[]) {
    return await this.prisma.style.createMany({
      data: dto,
    });
  }

  async getAll() {
    const result = await this.prisma.style.findMany({
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

    return result.map((item) => ({
      id: item.id,
      title: item.title,
      productCount: new Set(item.product.map((v) => v.id)).size,
    }));
  }

  async delete(id: string) {
    await this.prisma.style.delete({ where: { id } });
    return 'Стиль удален!';
  }
  async update(id: string, dto: CreateStyleDto) {
    await this.prisma.style.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }
}
