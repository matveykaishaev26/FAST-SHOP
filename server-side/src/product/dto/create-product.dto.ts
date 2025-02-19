import { IsNotEmpty, IsString, IsNumber, ArrayMinSize } from 'class-validator';

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

  @IsNumber(
    {},
    {
      message: 'Цена должна быть числом',
    },
  )
  @IsNotEmpty({
    message: 'Цена обязательна',
  })
  price: number;

  @IsString({
    message: 'Укажите хотябы одну картинку',
    each: true,
  })
  @IsNotEmpty({
    message: 'Путь к картинке не должен быть пустой',
    each: true,
  })
  @ArrayMinSize(1, { message: 'Должна быть хотябы одна картинка' })
  images: string[];

  @IsString({
    message: 'Категория обязательна!',
  })
  @IsNotEmpty({
    message: 'ID категории обязательно!',
  })
  categoryId: string;

  @IsString({
    message: 'Цвет обязателен!',
  })
  @IsNotEmpty({
    message: 'ID цвета обязательно!',
  })
  colorId: string;
}
