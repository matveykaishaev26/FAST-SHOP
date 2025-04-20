import { Controller, Param, Post } from '@nestjs/common';
import { UserFavoritesService } from './user-favorites.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/user/decorators/user.decorator';

@Controller('user-favorites')
export class UserFavoritesController {
  constructor(private readonly userFavoritesService: UserFavoritesService) {}

  @Auth()
  @Post('toggle/:productVariantId')
  async toggleFavorite(
    @CurrentUser('id') userId: string,
    @Param('productVariantId') productVariantId: string,
  ) {
    // console.log(userId)
    // console.log('zhopa')
    return this.userFavoritesService.toggleFavorite(userId, productVariantId);
  }
}
