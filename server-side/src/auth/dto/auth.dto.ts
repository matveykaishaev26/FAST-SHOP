import {
  IsEmail,
  IsOptional,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class AuthDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsNotEmpty({
    message: 'Почта обязательна!',
  })
  @IsString()
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: 'Пароль должен быть не менее 6 символов!',
  })
  @MaxLength(32, {
    message: 'Пароль не должен превышать 32 символа!',
  })
  @IsNotEmpty({
    message: 'Пароль обязателен!',
  })
  @IsString()
  password: string;
}

export class PasswordResetDto {
  @IsNotEmpty({
    message: 'Почта обязательна!',
  })
  @IsString({
    message: 'Почта должна быть валидной!',
  })
  @IsEmail({})
  email: string;
}

export class NewPasswordDto {
  @IsNotEmpty({
    message: 'Новый пароль обязательна!',
  })
  @IsString({
    message: 'Пароль должен быть валидной!',
  })
  password: string;
}
