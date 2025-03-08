import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColorDto {
  @IsNotEmpty({ message: 'Название обязательно' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'Hex обязательно' })
  @IsString()
  hex: string;
}
