import { IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty({
    message: 'Название категории обязательно!',
  })
  title: string;
  @IsNotEmpty({
    message: 'Описание категории обязательно!',
  })
  description: string;
}
