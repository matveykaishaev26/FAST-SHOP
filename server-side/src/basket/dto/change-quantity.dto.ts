import { IsString, IsIn } from 'class-validator';

export class ChangeQuantityDto {
  @IsString()
  productVariantId: string;

  @IsString()
  sizeId: string;

  @IsIn(['plus', 'minus'])
  variant: 'plus' | 'minus';
}
