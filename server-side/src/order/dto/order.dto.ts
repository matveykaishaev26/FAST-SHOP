import { EnumOrderStatus } from '@prisma/client';
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
  @IsEnum(EnumOrderStatus, {
    message:
      'Статус должен быть одним из: ' +
      Object.values(EnumOrderStatus).join(', '),
  })
  status: EnumOrderStatus;

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


  @IsString({ message: 'ID продукта должен быть строкой' })
  productId: string;
  @IsString({ message: 'ID продукта должен быть строкой' })
  storeId: string;
}
