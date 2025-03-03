import { Color, Gender, Season } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { IsNotEmpty, IsOptional, IsEnum, IsDecimal } from 'class-validator';
export class CreateProductVariantDto {
  @IsNotEmpty({
    message: 'Размер обязателен',
  })
  @IsNotEmpty({
    message: 'Цвет обязателен',
  })
  @IsEnum(Color)
  color: Color;
  @IsDecimal(
    { force_decimal: true, decimal_digits: '2' },
    { message: 'Неправильный ввод цены!' },
  )
  price: Decimal;

  @IsNotEmpty({
    message: 'Размер обязателен',
  })
  productId: string;

  images: string[];
}
