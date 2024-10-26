import {
  IsBoolean,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsDateString,
  Length,
} from 'class-validator';
import { isLength } from 'validator';
export class loginDto {
  @IsString()
  login: string;
  @IsString()
  password: string;
}

export class signInDto {
  @IsString()
  @MinLength(8, { message: 'Ваши инициалы не могут быть меньше 8 символов' })
  @MaxLength(100, {
    message: 'Ваши инициалы не могут быть больше 100 символов',
  })
  initials: string;

  @IsString()
  @MinLength(3, { message: 'Слишком короткий никнейм' })
  @MaxLength(10, { message: 'Слишком длинный никнейм' })
  nickname: string;

  @IsEmail({}, { message: 'Пожалуйста, убедитесь, что ваша почта валидна' })
  email: string;

  @IsDateString({}, { message: 'Дата рождения должна быть корректной датой' })
  date: string;

  @IsBoolean({ message: 'Пол должен быть булевым значением' })
  gender: boolean;

  @IsString()
  @MinLength(6, { message: 'Слишком короткий пароль' })
  password: string;
}

export class createCodeDto {
  @IsEmail({}, { message: 'Пожалуйста, убедитесь, что ваша почта валидна' })
  email: string;
}

export class checkCodeDto {
  @IsEmail({}, { message: 'Пожалуйста, убедитесь, что ваша почта валидна' })
  email: string;
  @IsString()
  @Length(6, 6, { message: 'Ваш код не валидный' })
  code: string;
}

export class updatePasswordDto {
  @IsEmail({}, { message: 'Пожалуйста, убедитесь, что ваша почта валидна' })
  mail: string;
  @Length(6, 6, { message: 'Ваш код не валидный' })
  code: string;
  @MinLength(6, { message: 'Слишком короткий пароль' })
  password: string;
}
