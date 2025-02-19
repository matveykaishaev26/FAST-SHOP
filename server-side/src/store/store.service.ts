import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { Body } from '@nestjs/common';
import { UpdateStoreDto } from './dto/update-store.dto';
@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}

  async getById(storeId: string, userId: string) {
    const store = await this.prisma.store.findUnique({
      where: {
        id: storeId,
        userId: userId,
      },
    });

    if (!store) {
      throw new NotFoundException(
        'Магазин не найден или вы не являетесь его владельцем!',
      );
    }

    return store;
  }

  async createStore(dto: CreateStoreDto, userId: string) {
    return this.prisma.store.create({
      data: {
        title: dto.title,
        userId: userId,
      },
    });
  }

  async updateStore(dto: UpdateStoreDto, storeId: string, userId: string) {
    await this.getById(storeId, userId);

    return this.prisma.store.update({
      where: { id: storeId },
      data: {
        title: dto.title,
        description: dto.description,
        userId: userId,
      },
    });
  }

  async deleteStore(storeId: string, userId: string) {
    await this.getById(storeId, userId);

    return this.prisma.store.delete({
      where: { id: storeId },
    });
  }
}
