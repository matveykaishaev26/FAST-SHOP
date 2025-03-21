import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductVariantQuantityDto {
  @IsNotEmpty({
    message: 'Id товара обязательно',
  })
  productVariantId: string;

  @IsNotEmpty({
    message: 'Количествo обязательно',
  })
  quantity: number;

  @IsNotEmpty({
    message: 'Размер обязательно',
  })
  sizeId: string; // Используем тип number, так как TypeScript использует number для всех чисел, включая float
}
