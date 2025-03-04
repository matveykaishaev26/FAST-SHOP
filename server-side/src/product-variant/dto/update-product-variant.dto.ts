import { Gender, Season } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateProductDto {
  @IsNotEmpty({
    message: 'Название обязательно',
  })
  title: string;
  @IsNotEmpty({
    message: 'Описание обязательно',
  })
  description: string;

  @IsNotEmpty({
    message: 'Id категории обязательно!',
  })
  categoryId: string;

  @IsNotEmpty({
    message: 'Сезон обязателен!',
  })
  season: Season;

  @IsOptional()
  technologyId: string;

  @IsNotEmpty({
    message: 'Пол обязателен!',
  })
  gender: Gender;

  @IsOptional()
  styleId: string;
}
