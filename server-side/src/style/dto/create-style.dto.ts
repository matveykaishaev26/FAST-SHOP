import { IsNotEmpty } from 'class-validator';

export class CreateStyleDto {
  @IsNotEmpty({
    message: 'Название  обязательно!',
  })
  title: string;
}
