import {
  Controller,
  Post,
  Get,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Query,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpCode } from '@nestjs/common';
import { AuthDto, NewPasswordDto, PasswordResetDto } from './dto/auth.dto';
import { Response, Request } from 'express';
import { Body, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private logger: Logger = new Logger(AuthController.name);
  @Post('login')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.login(dto);
    this.authService.addRefreshTokenToResponse(res, refreshToken);
    return response;
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async register(@Body() dto: AuthDto) {
    const response = await this.authService.register(dto);
    return response;
  }

  @Post('send-password-reset-email')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async passwordReset(@Body() dto: PasswordResetDto) {
    const response = await this.authService.passwordReset(dto);
    return response;
  }

  @Post('reset-password')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async createNewPassword(
    @Res({ passthrough: true }) res: Response,

    @Query('token') token: string,
    @Body() dto: NewPasswordDto,
  ) {
    this.logger.warn(token)
    const { refreshToken, ...response } =
      await this.authService.createNewPassword(token, dto);
    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }
  @HttpCode(200)
  @Post('verify-email')
  async emailVerification(
    @Query('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...response } =
      await this.authService.emailVerification(token);
    this.authService.addRefreshTokenToResponse(res, refreshToken);
    return response;
  }

  @Post('login/access-token')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async getNewTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshTokenFromCookies =
      req.cookies[this.authService.REFRESH_TOKEN_NAME];

    if (!refreshTokenFromCookies) {
      this.authService.removeRefreshTokenFromResponse(res);
      throw new UnauthorizedException('Refresh токен не прошел');
    }

    const { refreshToken, ...response } = await this.authService.getNewTokens(
      refreshTokenFromCookies,
    );
    this.authService.addRefreshTokenToResponse(res, refreshToken);
    return response;
  }

  @HttpCode(200)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res);
    return { message: 'Logout successful' };
  }

  @Get('yandex')
  @UseGuards(AuthGuard('yandex'))
  async yandexAuth(@Req() _req) {}

  @Get('yandex/callback')
  @UseGuards(AuthGuard('yandex'))
  async yandexAuthCallback(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.logger.log(req.user);

    const { refreshToken, ...response } =
      await this.authService.validateOAuthLogin(req);
    this.authService.addRefreshTokenToResponse(res, refreshToken);
    return res.redirect(
      `${process.env['CLIENT_URL']}/dashboard?accessToken=${response.accessToken}`,
    );
  }
  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthCallback(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...response } =
      await this.authService.validateOAuthLogin(req);
    this.logger.log(req);
    this.authService.addRefreshTokenToResponse(res, refreshToken);
    return res.redirect(
      `${process.env['CLIENT_URL']}/dashboard?accessToken=${response.accessToken}`,
    );
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth(@Req() _req) {}
}
