import { Gender } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({
    message: 'Название обязательно',
  })
  @IsString()
  title: string;
  @IsNotEmpty({
    message: 'Описание обязательно',
  })
  @IsString()
  description: string;

  @IsString({
    message: 'Категория обязательна!',
  })
  @IsNotEmpty({
    message: 'ID категории обязательно!',
  })
  categoryId: string;

  @IsNotEmpty({
    message: 'ID бренда обязательно!',
  })
  brandId: string;

  @IsString({
    message: 'Неправильный тип!',
  })
  technologyId: string;
  @IsOptional()
  styleId: string;
  @IsEnum(Gender)
  gender: Gender;
}
