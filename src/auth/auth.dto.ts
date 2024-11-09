import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
export class loginDto {
  @ApiProperty({
    example: 'example@example.com',
    description:
      'Является почтой пользователя, служит для верификации клиента.',
    type: String,
    required: true,
    default: 'example@example.com',
  })
  @IsString({ message: 'Значение поля `Почта` должно быть строкой' })
  @IsNotEmpty({
    message: 'Поле `Почта` обязательно для заполнения',
  })
  login: string;

  @ApiProperty({
    example: 'j3j4fd-9j43pihf3j2rfjpi3hg',
    description:
      'Пароль пользователя. Является ключевой строкой для входа пользователя, служит для верификации клиента.',
    type: String,
    required: true,
    default: 'j3j4fd-9j43pihf3j2rfjpi3hg',
  })
  @IsString({ message: 'Значение поля `Пароль` должно быть строкой' })
  @IsNotEmpty({
    message: 'Поле `Пароль` обязательно для заполнения',
  })
  password: string;
}

export class signInDto {
  @ApiProperty({
    example: 'Иванов Иван Иванович',
    description: 'Инициалы пользователя. Фамилия Имя Отчества или Фамилия Имя',
    type: String,
    required: true,
    default: 'Иванов Иван Иванович',
  })
  @IsString({
    message: 'Значение поля `ФИО` должно быть строкой',
  })
  @MinLength(8, { message: 'Ваши инициалы не могут быть меньше 8 символов' })
  @MaxLength(100, {
    message: 'Ваши инициалы не могут быть больше 100 символов',
  })
  @IsNotEmpty({
    message: 'Поле `ФИО` обязательно для заполнения',
  })
  initials: string;

  @ApiProperty({
    example: 'VLauthor',
    description: 'Никнейм пользователя.',
    type: String,
    required: true,
    default: 'VLauthor',
  })
  @IsString({ message: 'Значение поля `Никнейм` должно быть строкой' })
  @MinLength(3, { message: 'Слишком короткий никнейм' })
  @MaxLength(10, { message: 'Слишком длинный никнейм' })
  @IsNotEmpty({
    message: 'Поле `Никнейм` обязательно для заполнения',
  })
  nickname: string;

  @ApiProperty({
    example: 'example@example.com',
    description: 'Никнейм пользователя.',
    type: String,
    required: true,
    default: 'example@example.com',
  })
  @IsNotEmpty({
    message: 'Поле `Почта` обязательно для заполнения',
  })
  @IsEmail({}, { message: 'Пожалуйста, убедитесь, что ваша почта валидна' })
  email: string;

  @ApiProperty({
    example: '2000-01-01',
    description: 'Никнейм пользователя.',
    type: String,
    required: true,
    default: '2000-01-01',
  })
  @IsNotEmpty({
    message: 'Поле `Дата рождения` обязательно для заполнения',
  })
  @IsDateString({}, { message: 'Дата рождения должна быть корректной датой' })
  date: string;

  @ApiProperty({
    example: true,
    description: 'Пол пользователя.',
    type: Boolean,
    required: true,
    default: true,
  })
  @IsNotEmpty({
    message: 'Поле `Пол` обязательно для заполнения',
  })
  @IsBoolean({ message: 'Пол должен быть булевым значением' })
  gender: boolean;

  @ApiProperty({
    example: 'jjfr943fj3j49j4',
    description:
      'Пароль пользователя. Является ключевой строкой для входа пользователя, служит для верификации клиента.',
    type: String,
    required: true,
    default: 'jjfr943fj3j49j4',
  })
  @IsString({
    message: 'Значение поля `Пароль` должно быть строкой',
  })
  @IsNotEmpty({
    message: 'Поле `Пароль` обязательно для заполнения',
  })
  @MinLength(6, { message: 'Слишком короткий пароль' })
  password: string;
}

export class createCodeDto {
  @ApiProperty({
    example: 'example@example.com',
    description:
      'Является почтой пользователя, служит для верификации клиента.',
    type: String,
    required: true,
    default: 'example@example.com',
  })
  @IsString({ message: 'Значение поля `Почта` должно быть строкой' })
  @IsNotEmpty({
    message: 'Поле `Почта` обязательно для заполнения',
  })
  @IsEmail({}, { message: 'Пожалуйста, убедитесь, что ваша почта валидна' })
  email: string;
}

export class checkCodeDto {
  @ApiProperty({
    example: 'example@example.com',
    description:
      'Является почтой пользователя, служит для верификации клиента.',
    type: String,
    required: true,
    default: 'example@example.com',
  })
  @IsEmail({}, { message: 'Пожалуйста, убедитесь, что ваша почта валидна' })
  @IsString({ message: 'Значение поля `Почта` должно быть строкой' })
  @IsNotEmpty({
    message: 'Поле `Почта` обязательно для заполнения',
  })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Является кодом пользователя, служит для смены пароля.',
    type: String,
    required: true,
    default: '123456',
  })
  @IsString({ message: 'Значение поля `Код` должно быть строкой' })
  @IsNotEmpty({
    message: 'Поле `Код` обязательно для заполнения',
  })
  @Length(5, 5, { message: 'Ваш код не валидный' })
  code: string;
}

export class updatePasswordDto {
  @ApiProperty({
    example: 'example@example.com',
    description:
      'Является почтой пользователя, служит для верификации клиента.',
    type: String,
    required: true,
    default: 'example@example.com',
  })
  @IsEmail({}, { message: 'Пожалуйста, убедитесь, что ваша почта валидна' })
  @IsString({ message: 'Значение поля `Почта` должно быть строкой' })
  @IsNotEmpty({
    message: 'Поле `Почта` обязательно для заполнения',
  })
  mail: string;

  @ApiProperty({
    example: '123456',
    description: 'Является кодом пользователя, служит для смены пароля.',
    type: String,
    required: true,
    default: '123456',
  })
  @IsString({ message: 'Значение поля `Код` должно быть строкой' })
  @IsNotEmpty({
    message: 'Поле `Код` обязательно для заполнения',
  })
  @Length(5, 5, { message: 'Ваш код не валидный' })
  code: string;

  @ApiProperty({
    example: 'j3j4fd-9j43pihf3j2rfjpi3hg',
    description:
      'Пароль пользователя. Является ключевой строкой для входа пользователя, служит для верификации клиента.',
    type: String,
    required: true,
    default: 'j3j4fd-9j43pihf3j2rfjpi3hg',
  })
  @IsString({ message: 'Значение поля `Пароль` должно быть строкой' })
  @IsNotEmpty({
    message: 'Поле `Пароль` обязательно для заполнения',
  })
  @MinLength(6, { message: 'Слишком короткий пароль' })
  password: string;
}
