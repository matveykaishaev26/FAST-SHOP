import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBrandDto } from './dto/create-brand.dto';
@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async getBrands(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const take = Number(limit);

    const brands = await this.prisma.brand.findMany({
      skip,
      take,
      orderBy: [
        {
          title: 'asc',
        },
      ],
    });

    const totalCount = await this.prisma.brand.count();

    const totalPages = Math.ceil(totalCount / take);
    const currentPage = Math.max(1, Math.min(page, totalPages));

    return {
      items: brands,
      totalCount,
      totalPages,
      currentPage,
    };
  }
  async getAll() {
    const brands = await this.prisma.brand.findMany({
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

    return brands.map((item) => ({
      id: item.id,
      title: item.title,
      productCount: new Set(item.product.map((v) => v.id)).size,
    }));
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
  async createBrand(title: string) {
    await this.prisma.brand.create({
      data: {
        title,
      },
    });
  }
  async create(dto: CreateBrandDto[]) {
    return this.prisma.brand.createMany({
      data: dto,
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
