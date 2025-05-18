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

  async getOrders(userId: string) {
    const res = await this.prisma.order.findMany({
      where: {
        userId,
        status: 'PAYED',
      },
      select: {
        id: true,
        createdAt: true,
        total: true,
        status: true,

        items: {
          select: {
            price: true,
            quantity: true,
            size: {
              select: {
                title: true,
              },
            },
            productVariant: {
              select: {
                id: true,
                images: true,
                price: true,
                productVariantColors: {
                  select: {
                    color: { select: { title: true } },
                  },
                },
                product: {
                  select: {
                    title: true,
                    brand: {
                      select: { title: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.map((order) => ({
      id: order.id,
      total: order.total,
      createdAt: order.createdAt,
      items: order.items.map((item) => ({
        quantity: item.quantity,
        price: item.productVariant.price,
        productVariantId: item.productVariant.id,
        title: item.productVariant.product.title,
        brand: item.productVariant.product.brand.title,
        image: item.productVariant.images?.[0] ?? null,
        size: item.size
          ? {
              title: item.size.title,
            }
          : null,
        colors:
          item.productVariant.productVariantColors?.map((v) => v.color.title) ||
          [],
      })),
    }));
  }

  async createPayment(dto: OrderDto, userId: string) {
    // const orderItems = dto.items.map((item) => ({
    //   quantity: item.quantity,
    //   price: item.price,
    //   size: {
    //     connect: {
    //       id: item.sizeId,
    //     },
    //   },
    //   productVariant: {
    //     connect: {
    //       id: item.productVariantId,
    //     },
    //   },
    // }));
    const totalPrice = dto.items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    const order = await this.prisma.order.create({
      data: {
        status: dto.status,
        // items: {
        //   create: orderItems,
        // },
        total: totalPrice,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    const orderItems = dto.items.map((item) => ({
      orderId: order.id,
      quantity: item.quantity,
      price: item.price,
      sizeId: item.sizeId,
      productVariantId: item.productVariantId,
    }));
    await this.prisma.orderItem.createMany({
      data: orderItems,
    });
    const variantIds = dto.items.map((item) => item.productVariantId);

    const variants = await this.prisma.productVariant.findMany({
      where: {
        id: {
          in: variantIds,
        },
      },
      include: {
        product: {
          select: {
            title: true,
          },
        },
      },
    });

    const line_items = dto.items.map((item) => {
      const variant = variants.find((v) => v.id === item.productVariantId);
      return {
        price_data: {
          currency: 'rub',
          product_data: {
            name: variant?.product.title || 'Товар',
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
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

      const order = await this.prisma.order.findUnique({
        where: {
          id: orderId,
        },
      });
      if (!orderId) {
        this.logger.error('Order ID not found in metadata');
        return;
      }

      await this.prisma.order.update({
        where: { id: orderId },
        data: { status: OrderStatus.PAYED },
      });

      const orderItems = await this.prisma.orderItem.findMany({
        where: {
          orderId,
        },
      });

      const orderItemsIds = orderItems.map((item) => ({
        productVariantId: item.productVariantId,
        sizeId: item.sizeId,
        quantity: item.quantity,
      }));
      await Promise.all(
        orderItemsIds.map((item) =>
          this.prisma.productVariantQuantity.update({
            where: {
              productVariantId_sizeId: {
                productVariantId: item.productVariantId,
                sizeId: item.sizeId,
              },
            },
            data: {
              quantity: {
                decrement: item.quantity,
              },
            },
          }),
        ),
      );

      await Promise.all(
        orderItemsIds.map((item) =>
          this.prisma.basket.delete({
            where: {
              userId_productVariantId_sizeId: {
                productVariantId: item.productVariantId,
                sizeId: item.sizeId,
                userId: order.userId,
              },
            },
          }),
        ),
      );
    }
  }
}
