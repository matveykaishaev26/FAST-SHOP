import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        category: true,
        reviews: true,
      },
    });

    if (!product) throw new NotFoundException('Товар не найден!');
    return product;
  }

  async getGenderCounts() {
    const result = await this.prisma.product.groupBy({
      by: ['gender'],
      _count: {
        id: true,
      },
    });

    // Массив возможных гендеров
    const genders = [
      { id: 'MALE', title: 'Мужской' },
      { id: 'FEMALE', title: 'Женский' },
      { id: 'UNISEX', title: 'Унисекс' },
    ];

    // Возвращаем массив объектов, где для каждого гендера подсчитано количество продуктов
    return genders.map((gender) => {
      const genderCount = result.find((r) => r.gender === gender.id);
      return {
        ...gender,
        productCount: genderCount ? genderCount._count.id : 0, // Если гендер найден, берем количество, иначе 0
      };
    });
  }

  async getAll(searchTerm: string) {
    if (searchTerm) return this.getSearchTermFilter(searchTerm);

    return await this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    });
  }

  async getByCategoryId(categoryId: string) {
    const products = await this.prisma.product.findMany({
      where: {
        categoryId: categoryId,
      },
      include: {
        category: true,
      },
    });

    if (!products) throw new NotFoundException('Товары не найдены!');
    return products;
  }

  async getMostPopular() {
    const mostPopuldarProducts = await this.prisma.orderItem.groupBy({
      by: ['productVariantId'],
      _count: {
        quantity: true,
      },
      orderBy: {
        _count: {
          quantity: 'desc',
        },
      },
    });

    const productIds = mostPopuldarProducts.map(
      (item) => item.productVariantId,
    );

    const products = await this.prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      include: {
        category: true,
      },
    });

    return products;
  }

  private async getSearchTermFilter(searchTerm: string) {
    return this.prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  async getSimilar(id: string) {
    const currentProduct = await this.getById(id);
    if (!currentProduct) throw new NotFoundException('Текущий товар не найден');

    const products = await this.prisma.product.findMany({
      where: {
        category: {
          title: currentProduct.category.title,
        },
        NOT: {
          id: currentProduct.id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    });

    return products;
  }

  async create(dto: CreateProductDto[]) {
    return await this.prisma.product.createMany({
      data: dto,
    });
  }

  async update(id: string, dto: UpdateProductDto) {
    return await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: string) {
    await this.getById(id);
    return await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }

  async addToFavorite(userId: string, productVariantId: string) {
    const existing = await this.prisma.userFavorites.findFirst({
      where: {
        userId,
        productVariantId,
      },
    });

    if (existing) {
      // Если уже есть — можно либо вернуть ошибку, либо удалить (toggle)
      await this.prisma.userFavorites.deleteMany({
        where: {
          userId,
          productVariantId,
        },
      });
    }
    await this.prisma.userFavorites.create({
      data: {
        userId,
        productVariantId,
      },
    });
    return { message: 'Добавлено в избранное' };
  }

  async getProductCards(
    page: number = 1,
    limit: number = 10,
    filters: {
      brandIds?: string[];
      materialIds?: string[];
      genderIds?: string[];
      styleIds?: string[];
      categoryIds?: string[];
      sizeIds?: string[];
      colorIds?: string[];
      priceRange?: number[];
    } = {},
  ) {
    const skip = (page - 1) * limit;
    const take = Number(limit);

    const hasValidPriceRange =
      Array.isArray(filters.priceRange) &&
      filters.priceRange.length === 2 &&
      filters.priceRange.every((v) => typeof v === 'number' && !isNaN(v));

    // console.log(filters);

    const where: any = {
      ...(filters.brandIds?.length && {
        product: { brandId: { in: filters.brandIds } },
      }),
      ...(filters.materialIds?.length && {
        product: { materialId: { in: filters.materialIds } },
      }),
      ...(filters.genderIds?.length && {
        product: { genderId: { in: filters.genderIds } },
      }),
      ...(filters.styleIds?.length && {
        product: { styleId: { in: filters.styleIds } },
      }),
      ...(filters.categoryIds?.length && {
        product: { categoryId: { in: filters.categoryIds } },
      }),
      ...(filters.sizeIds?.length && {
        productVariantQuantity: {
          some: { sizeId: { in: filters.sizeIds } },
        },
      }),
      ...(filters.colorIds?.length && {
        productVariantColors: {
          some: { colorId: { in: filters.colorIds } },
        },
      }),
      ...(hasValidPriceRange && {
        price: {
          gte: filters.priceRange[0],
          lte: filters.priceRange[1],
        },
      }),
    };

    const totalCount = await this.prisma.productVariant.count({ where });

    const totalPages = Math.ceil(totalCount / take);
    const currentPage = Math.max(1, Math.min(page, totalPages));

    const products = await this.prisma.productVariant.findMany({
      where,
      skip,
      take,
      select: {
        id: true,
        images: true,
        price: true,
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
        productVariantQuantity: {
          select: {
            size: { select: { title: true, id: true } },
            quantity: true,
          },
        },
        productVariantColors: {
          select: {
            color: { select: { title: true } },
          },
        },
      },
    });

    return {
      totalCount,
      totalPages,
      currentPage,
      items: products.map((product) => ({
        id: product.id,
        title: product.product.title,
        brand: product.product.brand.title,
        images: product.images,
        price: product.price,
        sizes: product.productVariantQuantity.map((v) => ({
          id: v.size.id,
          title: v.size.title,
          quantity: v.quantity,
        })),
        colors: product.productVariantColors.map((v) => v.color.title),
        rating: {
          value:
            product.product.reviews.length !== 0
              ? (
                  product.product.reviews.reduce(
                    (acc, review) => acc + review.rating,
                    0,
                  ) / product.product.reviews.length
                ).toFixed(2)
              : 'Нет отзывов',
          count: product.product.reviews.length,
        },
      })),
    };
  }
}
