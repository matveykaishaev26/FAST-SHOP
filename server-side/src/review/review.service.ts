import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewDto } from './dto/review.dto';
@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string, userId: string) {
    const review = await this.prisma.review.findUnique({
      where: { id, userId },
      include: {
        user: true,
      },
    });

    if (!review)
      throw new NotFoundException(
        'Отзыв не найден или вы не являетесь его владельцем!',
      );
    return review;
  }

  async create(userId: string, productId: string, dto: ReviewDto) {
    return this.prisma.review.create({
      data: {
        ...dto,
        product: {
          connect: {
            id: productId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
  async delete(id: string, userId: string) {
    await this.getById(id, userId);
    return await this.prisma.review.delete({
      where: {
        id,
      },
    });
  }
}
