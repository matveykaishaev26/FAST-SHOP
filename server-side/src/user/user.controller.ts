import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Get, Patch, Param } from '@nestjs/common';
import { CurrentUser } from './decorators/user.decorator';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get('profile')
  async getProfile(@CurrentUser('id') id: string) {
    return this.userService.getById(id);
  }

  @Auth()
  @Patch('profile/favorites/:productVariantId')
  async toggleFavorite(
    @CurrentUser('id') userId: string,
    @Param('productVariantId') productVariantId: string,
  ) {
    return this.userService.toggleFavorite(productVariantId, userId);
  }
}
