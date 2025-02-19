import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty({
    message: 'Название магазина обязательно',
  })
  title: string;
}
