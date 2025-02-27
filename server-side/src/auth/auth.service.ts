import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthDto, NewPasswordDto, PasswordResetDto } from './dto/auth.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';
import { TokenService } from 'src/token/token.service';
import { verify, hash } from 'argon2';
@Injectable()
export class AuthService {
  EXPIRE_DAY_REFRESH_TOKEN = 1;
  REFRESH_TOKEN_NAME = 'refreshToken';

  constructor(
    private jwt: JwtService,
    private userService: UserService,
    private prisma: PrismaService,
    private configService: ConfigService,
    private emailService: EmailService,
    private tokenService: TokenService,
  ) {}
  private logger: Logger = new Logger(AuthService.name);
  async login(dto: AuthDto) {
    const user = await this.userService.validateVerifiedUser(dto.email);
    const isCorrect = await verify(user.password, dto.password);
    if (!isCorrect) {
      throw new UnauthorizedException('Неверный пароль или логин');
    }
    const tokens = this.tokenService.issueTokens(user.id);
    return { user, ...tokens };
  }
  async register(dto: AuthDto) {
    this.logger.warn(dto);
    const existingUser = await this.userService.getByEmail(dto.email);
    if (existingUser?.emailVerifiedAt) {
      throw new BadRequestException(
        'Пользователь с таким email уже зарегистрирован!',
      );
    }
    if (existingUser)
      await this.prisma.user.update({
        where: {
          email: existingUser.email,
        },
        data: {
          name: dto.name,
          email: dto.email,
          password: await hash(dto.password),
        },
      });

    const newVerificationToken = await this.tokenService.generateTemporaryToken(
      dto.email,
      'verificationToken',
    );

    await this.emailService.sendVerificationEmail(
      dto.email,
      newVerificationToken,
    );
    return { message: `Код подтверждения отправлен на ${dto.email}` };
  }
  async emailVerification(token: string) {
    const verificationToken = await this.tokenService.validateTemporaryToken(
      token,
      'verificationToken',
    );

    const user = await this.userService.validateUser(verificationToken.email);
    await this.prisma.verificationToken.delete({
      where: {
        email: verificationToken.email,
      },
    });

    const tokens = this.tokenService.issueTokens(user.id);
    await this.prisma.user.update({
      where: {
        email: verificationToken.email,
      },
      data: {
        emailVerifiedAt: new Date(),
      },
    });
    return { message: `Почта ${user.email} успешна подтверждена`, ...tokens };
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException('Невалидный refresh токен!');
    const user = await this.userService.getById(result.id);

    const tokens = this.tokenService.issueTokens(user.id);
    return { user, ...tokens };
  }

  async passwordReset(dto: PasswordResetDto) {
    await this.userService.validateUser(dto.email);
    const resetPasswordToken = await this.tokenService.generateTemporaryToken(
      dto.email,
      'passwordResetToken',
    );

    await this.emailService.sendPasswordResend(dto.email, resetPasswordToken);
    return { message: 'Код сброса пароля отправлен!' };
  }

  async createNewPassword(token: string, dto: NewPasswordDto) {
    const passwordResetToken = await this.tokenService.validateTemporaryToken(
      token,
      'passwordResetToken',
    );
    await this.prisma.passwordResetToken.delete({
      where: {
        email: passwordResetToken.email,
      },
    });
    const user = await this.userService.validateVerifiedUser(
      passwordResetToken.email,
    );
    const updatedUser = await this.userService.updatePassword(
      user.id,
      dto.password,
    );
    const tokens = this.tokenService.issueTokens(user.id);
    return { message: 'Пароль успешно изменен!', ...tokens };
  }
  async validateOAuthLogin(req: any) {
    let user = await this.userService.getByEmail(req.user.email);

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: req.user.email,
          name: req.user.name,
          picture: req.user.picture,
        },
        include: {
          stores: true,
          favorites: {
            include: {
              product: true,
            },
          },
          orders: true,
        },
      });
      await this.prisma.account.create({
        data: {
          userId: user.id,
          provider: req.user.provider,
          providerAccountId: req.user.providerAccountId,
        },
      });
    }

    const tokens = this.tokenService.issueTokens(user.id);
    return { user, ...tokens };
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: this.configService.get('SERVER_DOMAIN'),
      expires: expiresIn,
      secure: true,
      sameSite: 'none',
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: this.configService.get('SERVER_DOMAIN'),
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    });
  }
}
