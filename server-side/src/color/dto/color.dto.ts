import { IsNotEmpty } from 'class-validator';

export class ColorDto {
  @IsNotEmpty({
    message: 'Название обязательно',
  })
  name: string;

  @IsNotEmpty({
    message: 'Значение обязательно',
  })
  value: string;
}
