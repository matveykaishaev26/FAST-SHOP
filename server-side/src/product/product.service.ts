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

  async getProductCards(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const take = Number(limit);
    const totalCount = await this.prisma.productVariant.count(); // Всего брендов
    const totalPages = Math.ceil(totalCount / take);
    const currentPage = Math.max(1, Math.min(page, totalPages));

    const products = await this.prisma.productVariant.findMany({
      skip,
      take,

      select: {
        id: true,
        images: true,
        price: true,
        product: {
          select: {
            title: true,
            brand: true,
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
            size: { select: { title: true } }, // Учитываем вложенность size
          },
        },
        productVariantColors: {
          select: {
            color: { select: { title: true } }, // Учитываем вложенность color
          },
        },
      },
    });

    return {
      totalCount,
      totalPages: Math.ceil(totalCount / take),
      currentPage: currentPage,
      items: products.map((product) => ({
        id: product.id,
        title: product.product.title,
        brand: product.product.brand.title,
        images: product.images,
        price: product.price,
        sizes: product.productVariantQuantity.map(
          (variant) => variant.size.title,
        ),
        colors: product.productVariantColors.map(
          (variant) => variant.color.title,
        ),
        rating: {
          value:
            product.product.reviews.length !== 0
              ? (
                  product.product.reviews.reduce((acc, review) => {
                    acc += review.rating;
                    return acc;
                  }, 0) / product.product.reviews.length
                ).toFixed(2)
              : 'Нет отзывов',
          count: product.product.reviews.length,
        },
      })),
    };
  }
}
