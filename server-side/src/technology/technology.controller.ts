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
import { TechnologyService } from './technology.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('technologies')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  createTechnology(@Body() dto: CreateTechnologyDto[]) {
    return this.technologyService.create(dto);
  }

  @Get()
  getAllTechnology() {
    return this.technologyService.getAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  deleteTechnology(@Param('id') id: string) {
    return this.technologyService.delete(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(':id')
  updateTechnology(@Param('id') id: string, @Body() dto: CreateTechnologyDto) {
    return this.technologyService.update(id, dto);
  }
}
