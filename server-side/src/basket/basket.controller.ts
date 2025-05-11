import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { BasketService } from './basket.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { ChangeQuantityDto } from './dto/change-quantity.dto';

@Controller('baskets')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Auth()
  @Post(':productVariantId/:sizeId')
  async addToBasket(
    @CurrentUser('id') userId: string,
    @Param('productVariantId') productVariantId: string,
    @Param('sizeId') sizeId: string,
  ) {
    return this.basketService.addToBasket(userId, productVariantId, sizeId);
  }
  @Auth()
  @Get('count')
  getBasketCount(@CurrentUser('id') userId: string) {
    return this.basketService.getBasketCount(userId);
  }
  @Auth()
  @Get('cards')
  async getBasket(
    @CurrentUser('id') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.basketService.getBasket(page, limit, userId);
  }
  @Auth()
  @Delete(':productVariantId/:sizeId')
  async deleteFromBasket(
    @CurrentUser('id') userId: string,
    @Param('productVariantId') productVariantId: string,
    @Param('sizeId') sizeId: string,
  ) {
    return this.basketService.deleteFromBasket(
      userId,
      productVariantId,
      sizeId,
    );
  }

  @Auth()
  @Get(':productVariantId')
  async getAddedSizes(
    @CurrentUser('id') userId: string,
    @Param('productVariantId') productVariantId: string,
  ) {
    return this.basketService.getAddedSizes(userId, productVariantId);
  }


  @Auth()
@Patch('quantity')
async changeQuantity(@Body() dto: ChangeQuantityDto, @CurrentUser('id') userId: string) {
  return this.basketService.changeQuantity(userId, dto.productVariantId, dto.sizeId, dto.variant);
}
}
