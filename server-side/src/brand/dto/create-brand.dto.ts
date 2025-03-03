import { IsNotEmpty } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty({
    message: 'Название категории обязательно!',
  })
  title: string;
}
