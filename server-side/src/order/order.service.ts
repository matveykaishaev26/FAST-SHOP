import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';
import { OrderDto } from './dto/order.dto';
import { PaymentStatusDto } from './dto/payment-status.dto';
import { OrderStatus } from '@prisma/client';
import { env } from 'process';
@Injectable()
export class OrderService {
  private stripe: Stripe;
  private readonly logger = new Logger(OrderService.name);
  constructor(private prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async createPayment(dto: OrderDto, userId: string) {
    const orderItems = dto.items.map((item) => ({
      quantity: item.quantity,
      price: item.price,
      product: {
        connect: {
          id: item.productVariantId,
        },
      },
    }));
    const total = dto.items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    const order = await this.prisma.order.create({
      data: {
        status: dto.status,
        items: {
          create: orderItems,
        },
        total,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'rub',
            product_data: { name: 'Продукт' },
            unit_amount: total * 100, // В копейках
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/thankyou`,
      cancel_url: 'https://yourwebsite.com/cancel',
      metadata: {
        orderId: order.id,
        message: `Заказ в fastshop: #${order.id}`,
      },
    });

    return session;
  }

  async updateStatus(dto: any) {
    this.logger.log(dto);

    if (dto.type === 'checkout.session.completed') {
      const session = dto.data.object;
      const orderId = session.metadata?.orderId;

      if (!orderId) {
        this.logger.error('Order ID not found in metadata');
        return;
      }

      await this.prisma.order.update({
        where: { id: orderId },
        data: { status: OrderStatus.PAYED },
      });
    }
  }
}
