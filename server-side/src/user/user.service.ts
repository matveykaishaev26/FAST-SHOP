import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { hash } from 'argon2';
import { AuthDto } from '../auth/dto/auth.dto';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  private logger: Logger = new Logger(UserService.name);

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        favorites: {
          include: {
            productVariant: true,
          },
        },
        orders: true,
      },
    });

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        favorites: {
          include: {
            productVariant: true,
          },
        },
        orders: true,
      },
    });
    return user;
  }

  async getVerifiedUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
        emailVerifiedAt: {
          not: null,
        },
      },
      include: {
        favorites: {
          include: {
            productVariant: true,
          },
        },
        orders: true,
      },
    });
    return user;
  }
  // async createUser(dto: AuthDto) {
  //   this.logger.warn(dto);
  //   const user = await this.prisma.user.create({
  //     data: {
  //       name: dto.name,
  //       email: dto.email,
  //       password: await hash(dto.password),
  //     },
  //   });
  //   return user;
  // }
  async updatePassword(id: string, newPassword: string) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: await hash(newPassword),
      },
    });
  }
  async validateVerifiedUser(email: string) {
    const user = await this.getVerifiedUserByEmail(email);
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }
    return user;
  }
  async validateUser(email: string) {
    const user = await this.getByEmail(email);
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }
    return user;
  }

  async toggleFavorite(productVariantId: string, userId: string) {
    const user = await this.getById(userId);

    const isExists = this.prisma.userFavorites.findFirst({
      where: {
        userId,
        productVariantId,
      },
    });
    if (isExists) {
      await this.prisma.userFavorites.deleteMany({
        where: {
          userId,
          productVariantId,
        },
      });
    } else {
      await this.prisma.userFavorites.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          productVariant: {
            connect: {
              id: productVariantId,
            },
          },
        },
      });
    }
    return true;
  }
}
