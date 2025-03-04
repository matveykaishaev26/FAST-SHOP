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
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { BrandService } from './brand.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  async getAll() {
    return this.brandService.getAll();
  }

  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.brandService.getById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() dto: CreateBrandDto) {
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
