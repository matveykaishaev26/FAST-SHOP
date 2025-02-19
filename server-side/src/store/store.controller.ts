import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
  Get,
  Put,
  Param,
  UsePipes,
  Delete,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { CreateStoreDto } from './dto/create-store.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UpdateStoreDto } from './dto/update-store.dto';
@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}
  @Auth()
  @Get(':id')
  async getById(
    @Param('id') storeId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.storeService.getById(storeId, userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@CurrentUser('id') userId: string, @Body() dto: CreateStoreDto) {
    return this.storeService.createStore(dto, userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateStoreDto,
    @Param('id') storeId: string,
  ) {
    return this.storeService.updateStore(dto, storeId, userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(
    @CurrentUser('id') userId: string,
    @Param('id') storeId: string,
  ) {
    return this.storeService.deleteStore(storeId, userId);
  }
}
