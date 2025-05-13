import { OrderStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsEnum,
  IsArray,
  ValidateNested,
  IsNumber,
  IsString,
} from 'class-validator';

export class OrderDto {
  @IsOptional()
  @IsEnum(OrderStatus, {
    message:
      'Статус должен быть одним из: ' + Object.values(OrderStatus).join(', '),
  })
  status: OrderStatus;

  @IsArray({
    message: 'В заказе нет ни одного товара',
  })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

export class OrderItemDto {
  @IsNumber({}, { message: 'Количество должно быть числом' })
  quantity: number;

  @IsNumber({}, { message: 'Цена должна быть числом' })
  price: number;

  @IsString()
  sizeId: string;

  @IsString({ message: 'ID продукта должен быть строкой' })
  productVariantId: string;
}
