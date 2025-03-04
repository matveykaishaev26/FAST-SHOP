import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@Controller('materials')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  createMaterial(@Body() dto: CreateMaterialDto) {
    return this.materialService.createMaterial(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  getAllMaterials() {
    return this.materialService.getAllMaterials();
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  deleteMaterial(@Param('id') id: string) {
    return this.materialService.deleteMaterial(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  updateMaterial(@Param('id') id: string, @Body() dto: CreateMaterialDto) {
    return this.materialService.updateMaterial(id, dto);
  }
}
