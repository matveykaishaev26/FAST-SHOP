import { IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty({
    message: 'Название категории обязательно!',
  })
  title: string;
}
