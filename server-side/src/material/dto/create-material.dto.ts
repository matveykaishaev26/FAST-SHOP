import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMaterialDto {
  @IsNotEmpty({ message: 'Название обязательно' })
  @IsString()
  title: string;
}
