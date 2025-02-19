import {
  Controller,
  UsePipes,
  ValidationPipe,
  Post,
  HttpCode,
  Body,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { OrderDto } from './dto/order.dto';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { PaymentStatusDto } from './dto/payment-status.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('place')
  @Auth()
  async checkout(@Body() dto: OrderDto, @CurrentUser('id') userId: string) {
    return this.orderService.createPayment(dto, userId);
  }
  @HttpCode(200)
  @Post('status')
  async updateStatus(@Body() dto: any) {
    return this.orderService.updateStatus(dto);
  }
}
