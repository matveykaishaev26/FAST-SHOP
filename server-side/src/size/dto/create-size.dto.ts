import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSizeDto {
  @IsNotEmpty({ message: 'Размер обязательно' })
  @IsNumber({}, { message: 'Размер должен быть числом' })
  @Type(() => Number)
  title: number;
}
