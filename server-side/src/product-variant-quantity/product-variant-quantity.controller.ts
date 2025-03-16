import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductVariantQuantityService } from './product-variant-quantity.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { CreateProductVariantQuantityDto } from './dto/create-product-variant-quantity.dto';
@Controller('product-variant-quantities')
export class ProductVariantQuantityController {
  constructor(
    private readonly productVariantQuantityService: ProductVariantQuantityService,
  ) {}

  @Get()
  async getAll() {
    return this.productVariantQuantityService.getAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() dto: CreateProductVariantQuantityDto[]) {
    return this.productVariantQuantityService.create(dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    return this.productVariantQuantityService.delete(id);
  }
}
