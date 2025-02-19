import { ColorService } from './color.service';
import {
  Get,
  Param,
  Body,
  Post,
  UsePipes,
  Controller,
  HttpCode,
  Put,
  ValidationPipe,
  Delete,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ColorDto } from './dto/color.dto';
@Controller('colors')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get('by-storeId/:storeId')
  @Auth()
  async getByStoreId(@Param('storeId') storeId: string) {
    return this.colorService.getByStoreId(storeId);
  }

  @Get('by-id/:id')
  @Auth()
  async getById(@Param('id') colorId: string) {
    return this.colorService.getById(colorId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post(':storeId')
  async create(@Param('storeId') storeId: string, @Body() dto: ColorDto) {
    return this.colorService.create(storeId, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async update(@Param('id') storeId: string, @Body() dto: ColorDto) {
    return this.colorService.update(storeId, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.colorService.delete(id);
  }
}
