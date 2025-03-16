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
