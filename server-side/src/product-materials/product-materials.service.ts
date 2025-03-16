import { Injectable } from '@nestjs/common';
import { CreateProductMaterialsDto } from './dto/create-product-materials.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductMaterialsService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateProductMaterialsDto[]) {
    return await this.prisma.productMaterials.createMany({
      data: dto,
    });
  }

  async delete(id: string) {
    return await this.prisma.productMaterials.delete({
      where: {
        id,
      },
    });
  }
}
