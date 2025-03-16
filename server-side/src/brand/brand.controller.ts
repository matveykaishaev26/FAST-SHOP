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
    @Query('page') page = 1,
    @Query('limit') limit = 20,           
    @Query('all') all?: string,
  ) {
    const isAll = all === 'true';
    if (isAll) {
      return await this.brandService.getAll();
    }
    const skip = (page - 1) * limit;
    const brands = await this.brandService.getBrands(skip, +limit);
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
