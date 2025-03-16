import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MaterialService {
  constructor(private prisma: PrismaService) {}
  async createMaterial(dto: CreateMaterialDto[]) {
    return await this.prisma.material.createMany({
      data: dto,
    });
  }

  async getAllMaterials() {
    const materials = await this.prisma.material.findMany({
      include: {
        productMaterials: {
          select: {
            productId: true,
          },
        },
      },
      orderBy: [
        {
          title: 'asc',
        },
      ],
    });
    return materials.map((item) => ({
      id: item.id,
      title: item.title,
      productCount: new Set(item.productMaterials.map((v) => v.productId)).size, // Количество уникальных товаров
    }));
  }

  async deleteMaterial(id: string) {
    await this.prisma.material.delete({ where: { id } });
    return 'Материал удален!';
  }
  async updateMaterial(id: string, dto: CreateMaterialDto) {
    await this.prisma.material.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }
}
