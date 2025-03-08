import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductMaterialsService } from './product-materials.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateProductMaterialsDto } from './dto/create-product-materials.dto';

@Controller('product-materials')
export class ProductMaterialsController {
  constructor(
    private readonly productMaterialsService: ProductMaterialsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  createMaterial(@Body() dto: CreateProductMaterialsDto) {
    return this.productMaterialsService.create(dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  deleteMaterial(@Param('id') id: string) {
    return this.productMaterialsService.delete(id);
  }
}
