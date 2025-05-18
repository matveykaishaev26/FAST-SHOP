import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { BrandService } from './brand.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Query } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  async getBrands(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('all') all?: string,
  ) {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 20;
    const isAll = all === 'true';

    if (isAll) {
      return await this.brandService.getAll();
    }

    const brands = await this.brandService.getBrands(
      Number(page),
      Number(limit),
    );
    return brands;
  }

  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.brandService.getById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  async create(@Body() dto: CreateBrandDto[]) {
    return this.brandService.create(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() dto: CreateBrandDto) {
    return this.brandService.update(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    return this.brandService.delete(id);
  }
}
