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
    const totalCount = await this.prisma.basket.count({
      where: {
        userId,
      },
    });
    const skip = (page - 1) * limit;
    const take = Number(limit);
    const totalPages = Math.ceil(totalCount / take);
    const currentPage = Math.max(1, Math.min(page, totalPages));
    const basket = await this.prisma.basket.findMany({
      skip,
      take,
      where: {
        userId,
      },
      select: {
        id: true,
        quantity: true,
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
      items: basket.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        productVariantId: item.productVariant.id,
        title: item.productVariant.product.title,
        brand: item.productVariant.product.brand.title,
        image: item.productVariant.images[0],
        price: item.productVariant.price,
        size: item.size
          ? {
              id: item.size.id,
              title: item.size.title,
            }
          : {},
        colors: item.productVariant.productVariantColors
          ? item.productVariant.productVariantColors.map(
              (v) => v.color.title,
            )
          : [],
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
