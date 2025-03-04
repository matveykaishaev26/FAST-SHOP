import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MaterialService {
  constructor(private prisma: PrismaService) {}
  async createMaterial(dto: CreateMaterialDto) {
    return await this.prisma.material.create({
      data: {
        ...dto,
      },
    });
  }

  async getAllMaterials() {
    return await this.prisma.material.findMany();
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
