import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductVariantColorsDto {
  @IsNotEmpty({ message: 'Id цвета обязательно' })
  @IsString()
  colorId: string;
  @IsNotEmpty({ message: 'Id товара обязательно' })
  @IsString()
  productVariantId: string;
}
