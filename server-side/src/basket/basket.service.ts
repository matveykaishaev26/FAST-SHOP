import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BasketService {
  constructor(private prisma: PrismaService) {}

  async addToBasket(userId: string, productVariantId: string, sizeId: string) {
    console.log('dfgdfg');
    const basket = await this.prisma.basket.findFirst({
      where: {
        userId,
        sizeId,
        productVariantId,
      },
    });

    if (!basket) {
      await this.prisma.basket.create({
        data: {
          quantity: 1,
          userId,
          productVariantId,
          sizeId,
        },
      });
    }
  }
  async deleteFromBasket(
    userId: string,
    productVariantId: string,
    sizeId: string,
  ) {
    const basket = await this.prisma.basket.findFirst({
      where: {
        userId,
        productVariantId,
        sizeId,
      },
    });
    // console.log(basket);
    if (basket) {
      await this.prisma.basket.delete({
        where: {
          id: basket.id,
        },
      });
    }
  }
  async getAddedSizes(userId: string, productVariantId: string) {
    const basket = await this.prisma.basket.findMany({
      where: {
        userId,
        productVariantId,
      },
      select: {
        quantity: true,
        size: true,
      },
    });
    const res = basket.reduce(function (result, item) {
      return {
        ...result,
        [item.size.id]: item.quantity,
      };
    }, {});

    console.log(res);
    // console.log('все добавленный размеры')
    return res;
  }
  async getBasketCount(userId: string) {
    const count = await this.prisma.basket.count({
      where: {
        userId,
      },
    });

    return { count };
  }

  async getBasket(page: number = 1, limit: number = 10, userId: string) {
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
        productVariantId: favorite.productVariant.id,
        title: favorite.productVariant.product.title,
        brand: favorite.productVariant.product.brand.title,
        images: favorite.productVariant.images,
        price: favorite.productVariant.price,
        size: favorite.size
          ? {
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
              : '0.00',
          count: favorite.productVariant.product.reviews.length,
        },
      })),
    };
  }

  async changeQuantity(
    userId: string,
    productVariantId: string,
    sizeId: string,
    variant: 'plus' | 'minus',
  ) {
    const basketItem = await this.prisma.basket.findUnique({
      where: {
        userId_productVariantId_sizeId: {
          userId,
          productVariantId,
          sizeId,
        },
      },
    });

    if (!basketItem) {
      throw new Error('Basket item not found');
    }

    let newQuantity = basketItem.quantity;

    if (variant === 'plus') {
      newQuantity += 1;
    } else if (variant === 'minus') {
      newQuantity = Math.max(1, newQuantity - 1); // Не даем уйти в 0
    }

    await this.prisma.basket.update({
      where: {
        userId_productVariantId_sizeId: {
          userId,
          productVariantId,
          sizeId,
        },
      },
      data: {
        quantity: newQuantity,
      },
    });

    return newQuantity;
  }
}
