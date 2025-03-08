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
import { ProductVariantColorsService } from './product-variant-colors.service';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateProductVariantColorsDto } from './dto/create-product-variant-colors.dto';
@Controller('product-variant-colors')
export class ProductVariantColorsController {
  constructor(
    private readonly productVariantColorsService: ProductVariantColorsService,
  ) {}

  @Get()
  async getAll() {
    return this.productVariantColorsService.getAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() dto: CreateProductVariantColorsDto) {
    return this.productVariantColorsService.create(dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    return this.productVariantColorsService.delete(id);
  }
}
