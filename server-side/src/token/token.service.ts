import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TokenService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwt: JwtService,
  ) {}
  async generateTemporaryToken<T extends keyof PrismaClient>(
    email: string,
    tokenModel: T,
  ) {
    const model = this.prisma[tokenModel] as any;
    if (tokenModel === 'verificationToken')
      await this.userService.validateUser(email);
    else await this.userService.validateVerifiedUser(email);
    const existingToken = await model.findUnique({
      where: { email },
    });

    if (existingToken) {
      await model.delete({
        where: { email },
      });
    }

    const data = { email };
    const newToken = this.jwt.sign(data, {
      expiresIn: '15m',
    });

    await model.create({
      data: { email, token: newToken },
    });

    return newToken;
  }
  async validateTemporaryToken<T extends keyof PrismaClient>(
    token: string,
    tokenModel: T,
  ) {
    const model = this.prisma[tokenModel] as any;

    const temporaryToken = await model.findUnique({
      where: {
        token,
      },
    });

    if (!temporaryToken) {
      throw new NotFoundException('Токен не актуален!');
    }
    try {
      await this.jwt.verifyAsync(token); // Проверка токена на действительность
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        await model.delete({
          where: {
            email: temporaryToken.email,
          },
        });
        throw new UnauthorizedException('Токен истек!');
      }
      throw new UnauthorizedException('Неверный токен');
    }

    return temporaryToken;
  }
  issueTokens(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }
}
