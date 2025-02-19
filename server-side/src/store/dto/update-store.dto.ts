import { CreateStoreDto } from './create-store.dto';
import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateStoreDto extends CreateStoreDto {
  @IsNotEmpty({
    message: 'Описание обязательно',
  })
  @IsString()
  description: string;
}
