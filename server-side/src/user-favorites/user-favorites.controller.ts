import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { UserFavoritesService } from './user-favorites.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/user/decorators/user.decorator';

@Controller('user-favorites')
export class UserFavoritesController {
  constructor(private readonly userFavoritesService: UserFavoritesService) {}

  @Auth()
  @Post('toggle/:productVariantId/:sizeId')
  async toggleFavorite(
    @CurrentUser('id') userId: string,
    @Param('productVariantId') productVariantId: string,
    @Param('sizeId') sizeId: string,
  ) {
    return this.userFavoritesService.toggleFavorite(
      userId,
      productVariantId,
      sizeId,
    );
  }

  @Auth()
  @Post(':productVariantId/:sizeId')
  async addToFavorite(
    @CurrentUser('id') userId: string,
    @Param('productVariantId') productVariantId: string,
    @Param('sizeId') sizeId: string,
  ) {
    return this.userFavoritesService.addToFavorite(
      userId,
      productVariantId,
      sizeId,
    );
  }
  @Auth()
  @Get('count')
  getFavoritesCount(@CurrentUser('id') userId: string) {
    return this.userFavoritesService.getFavoritesCount(userId);
  }
  @Auth()
  @Get('cards')
  async getUserFavorites(
    @CurrentUser('id') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.userFavoritesService.getUserFavorites(page, limit, userId);
  }
  @Auth()
  @Delete(':productVariantId/:sizeId')
  async deleteFavorite(
    @CurrentUser('id') userId: string,
    @Param('productVariantId') productVariantId: string,
    @Param('sizeId') sizeId: string,
  ) {
    return this.userFavoritesService.deleteFavorite(
      userId,
      productVariantId,
      sizeId,
    );
  }

  @Auth()
  @Get('sizeAdded/:productVariantId')
  async getAddedSizes(
    @CurrentUser('id') userId: string,
    @Param('productVariantId') productVariantId: string,
  ) {
    return this.userFavoritesService.getAddedSizes(userId, productVariantId);
  }
}
