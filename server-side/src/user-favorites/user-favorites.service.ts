import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserFavoritesService {
  constructor(private prisma: PrismaService) {}
  async toggleFavorite(userId: string, productVariantId: string) {
    console.log(userId);
    console.log(productVariantId);
    console.log('asdasdasd');


    await this.prisma.userFavorites.create({
      data: {
        userId,
        productVariantId,
      },
    });
    return { message: 'Добавлено в избранное' };
  }
}
