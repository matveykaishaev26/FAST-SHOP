
import { IsNotEmpty, IsOptional, IsEnum, IsDecimal } from 'class-validator';
export class CreateProductVariantDto {
  @IsNotEmpty({
    message: 'Цена обязателен',
  })
  price: number;

  @IsNotEmpty({
    message: 'Id продукта обязателен',
  })
  productId: string;

  images: string[];
}
