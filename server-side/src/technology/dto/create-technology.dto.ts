import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTechnologyDto {
  @IsNotEmpty({ message: 'Название обязательно' })
  @IsString()
  title: string;
}
