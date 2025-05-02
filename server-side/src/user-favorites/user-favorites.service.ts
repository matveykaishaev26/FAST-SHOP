import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserFavoritesService {
  constructor(private prisma: PrismaService) {}

  async addToFavorite(
    userId: string,
    productVariantId: string,
    sizeId: string,
  ) {
    const userFavorites = await this.prisma.userFavorites.findFirst({
      where: {
        userId,
        sizeId,
        productVariantId,
      },
    });

    if (!userFavorites) {
      await this.prisma.userFavorites.create({
        data: {
          userId,
          productVariantId,
          sizeId,
        },
      });
    }
  }
  async deleteFavorite(
    userId: string,
    productVariantId: string,
    sizeId: string,
  ) {
    const userFavorites = await this.prisma.userFavorites.findFirst({
      where: {
        userId,
        sizeId,
        productVariantId,
      },
    });

    if (userFavorites) {
      await this.prisma.userFavorites.delete({
        where: {
          id: userFavorites.id,
        },
      });
    }
  }

  async getFavoritesCount(userId: string) {
    const favoritesCount = await this.prisma.userFavorites.count({
      where: {
        userId,
      },
    });

    return { favoritesCount };
  }

  async getUserFavorites(page: number = 1, limit: number = 10, userId: string) {
    const totalCount = await this.prisma.userFavorites.count({
      where: {
        userId,
      },
    });
    const skip = (page - 1) * limit;
    const take = Number(limit);
    const totalPages = Math.ceil(totalCount / take);
    const currentPage = Math.max(1, Math.min(page, totalPages));
    const favorites = await this.prisma.userFavorites.findMany({
      skip,
      take,
      where: {
        userId,
      },
      select: {
        id: true,
        size: {
          select: {
            id: true,
            title: true,
          },
        },

        productVariant: {
          select: {
            id: true,
            images: true,
            price: true,
            productVariantColors: {
              select: {
                color: { select: { title: true } },
              },
            },

            product: {
              select: {
                title: true,
                brand: {
                  select: { title: true },
                },
                _count: {
                  select: {
                    reviews: true,
                  },
                },
                reviews: {
                  select: {
                    rating: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return {
      totalCount,
      totalPages,
      currentPage,
      items: favorites.map((favorite) => ({
        id: favorite.id,
        title: favorite.productVariant.product.title,
        brand: favorite.productVariant.product.brand.title,
        images: favorite.productVariant.images,
        price: favorite.productVariant.price,
        size: favorite.size
          ? 
              {
                id: favorite.size.id,
                title: favorite.size.title,
              }
            
          : {},
        colors: favorite.productVariant.productVariantColors
          ? favorite.productVariant.productVariantColors.map(
              (v) => v.color.title,
            )
          : [],
        rating: {
          value:
            favorite.productVariant.product.reviews.length !== 0
              ? (
                  favorite.productVariant.product.reviews.reduce(
                    (acc, review) => acc + review.rating,
                    0,
                  ) / favorite.productVariant.product.reviews.length
                ).toFixed(2)
              : 'Нет отзывов',
          count: favorite.productVariant.product.reviews.length,
        },
      })),
    };
  }

  async toggleFavorite(
    userId: string,
    productVariantId: string,
    sizeId: string,
  ) {
    console.log(userId);
    console.log(productVariantId);
    console.log(sizeId);
    const userFavorites = await this.prisma.userFavorites.findFirst({
      where: {
        userId,
        sizeId,
        productVariantId,
      },
    });
    if (userFavorites) {
      await this.prisma.userFavorites.delete({
        where: {
          id: userFavorites.id,
        },
      });
      return { message: 'Удалено из избранного' };
    } else {
      await this.prisma.userFavorites.create({
        data: {
          userId,
          productVariantId,
          sizeId,
        },
      });
      return { message: 'Добавлено в избранное' };
    }
  }
}
