import { ProductPart } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateProductMaterialsDto {
  @IsNotEmpty({ message: 'Id товара обязательно' })
  productId: string;

  @IsNotEmpty({ message: 'Id материала обязательно' })
  materialId: string;
  @IsEnum(ProductPart)
  productPart: ProductPart;
  percentage: Decimal;
}
