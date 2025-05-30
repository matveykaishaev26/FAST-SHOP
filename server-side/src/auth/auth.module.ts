import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/config/jwt.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { YandexStrategy } from './strategy/yandex.strategy';
import { GithubStrategy } from './strategy/github.strategy';
import { EmailService } from 'src/email/email.service';
import { TokenService } from 'src/token/token.service';
@Module({
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UserService,
    JwtStrategy,
    YandexStrategy,
    GithubStrategy,
    EmailService,
    TokenService
  ],
})
export class AuthModule {}
