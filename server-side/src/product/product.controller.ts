import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  Delete,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/user/decorators/user.decorator';
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.productService.getAll(searchTerm);
  }

  @Get('by-id/:id')
  async getById(@Param('id') colorId: string) {
    return this.productService.getById(colorId);
  }
  @Get('by-categoryId/:categoryId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getByCategoryId(@Param('categoryId') storeId: string) {
    return this.productService.getByCategoryId(storeId);
  }

  @Get('most-popular')
  async getMostPopular() {
    return this.productService.getMostPopular();
  }
  @Get('gender-counts')
  async getQuantityByGenders() {
    return this.productService.getGenderCounts();
  }

  @Auth()
  @Post('add-to-favorite')
  async addToFavorite(
    @CurrentUser('id') userId: string,
    @Param('productVariantId') productVariantId: string,
  ) {
    return this.productService.addToFavorite(userId, productVariantId);
  }
  
  @Get('product-cards')
  async getProductCards(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('brandIds') brandIds?: string[] | string,
    @Query('materialIds') materialIds?: string[] | string,
    @Query('genderIds') genderIds?: string[] | string,
    @Query('styleIds') styleIds?: string[] | string,
    @Query('categoryIds') categoryIds?: string[] | string,
    @Query('sizeIds') sizeIds?: string[] | string,
    @Query('colorIds') colorIds?: string[] | string,
    @Query('priceRange') priceRange?: string,
  ) {
    function toArray(param?: string[] | string): string[] {
      return Array.isArray(param) ? param : param ? [param] : [];
    }

    let parsedPriceRange: number[] | undefined;
    console.log(priceRange);
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        parsedPriceRange = [min, max];
      }
    }

    return this.productService.getProductCards(Number(page), Number(limit), {
      brandIds: toArray(brandIds),
      materialIds: toArray(materialIds),
      genderIds: toArray(genderIds),
      styleIds: toArray(styleIds),
      categoryIds: toArray(categoryIds),
      sizeIds: toArray(sizeIds),
      colorIds: toArray(colorIds),
      priceRange: parsedPriceRange,
    });
  }

  @Get('similar/:id')
  async getSimilar(@Param('id') id: string) {
    return this.productService.getSimilar(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() dto: CreateProductDto[]) {
    return this.productService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto);
  }
}
