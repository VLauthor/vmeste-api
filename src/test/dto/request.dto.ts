import {
  IsBoolean,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsPhoneNumber,
  IsDateString,
  IsArray,
  IsNotEmpty,
  ArrayMinSize,
  IsNumber,
  IsInt,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

const testAnswersData: AddAnswerDTO[] = [
  { text: 'Вариант ответа 1', flag: false },
  { text: 'Вариант ответа 2', flag: false },
  { text: 'Вариант ответа 3', flag: true },
  { text: 'Вариант ответа 4', flag: false },
];
const testQuestionsData: AddQuestionDTO[] = [
  {
    text: 'Текст вопроса',
    hint: 'Подсказка',
    type: 'Текстовый',
    score: 9,
    answers: testAnswersData,
  },
  {
    text: 'Текст вопроса',
    hint: 'Подсказка',
    type: 'Текстовый',
    score: 9,
    answers: testAnswersData,
  },
];

export class CreateQuizDTO {
  @ApiProperty({
    example: 'Название викторины',
    description: 'Название викторины, отображаемое в интерфейсе пользователя',
    type: String,
    required: true,
    default: 'Новая викторина',
  })
  @IsString({
    message: 'Значение поля `Название викторины` должно быть строкой',
  })
  @IsNotEmpty({
    message: 'Поле `Название викторины` обязательно для заполнения',
  })
  title: string;

  @ApiProperty({
    example: 'Описание викторины',
    description: 'Название викторины, отображаемое в интерфейсе пользователя',
    type: String,
    required: false,
    default: 'Описание викторины',
  })
  @IsString({
    message: 'Значение поля `Описание викторины` должно быть строкой',
  })
  description?: string;

  @ApiProperty({
    example: ['Математика', 'Алгоритмы'],
    description:
      'Категории викторин, отображаемое в интерфейсе пользователя. По данному полю возможна фильтрация.',
    type: String,
    isArray: true,
    required: true,
    enum: [
      'Кино',
      'История',
      'Математика',
      'Физика',
      'Литература',
      'Студенчество',
      'Алгоритмы',
    ],
    default: ['Математика', 'Алгоритмы'],
  })
  @IsNotEmpty({
    message: 'Поле `Категории` обязательно для заполнения',
  })
  @IsArray({ message: 'Категории должны быть массивом' })
  @ArrayMinSize(1, { message: 'Минимум одна категория должна быть указана' })
  @IsString({
    each: true,
    message: 'Каждае значение в поле `Категории` должна быть строкой',
  })
  category: string[];

  @ApiProperty({
    example: 'Легко',
    description:
      'Уровень сложности викторин, отображаемое в интерфейсе пользователя. По данному полю возможна фильтрация.',
    type: String,
    required: true,
    enum: ['Легко', 'Нормально', 'Сложно'],
    default: 'Легко',
  })
  @IsNotEmpty({
    message: 'Поле `Сложность` обязательно для заполнения',
  })
  @IsString({ message: 'Значение поля `Сложность` должно быть строкой' })
  difficulty: string;

  @ApiProperty({
    example: ['Кооледж', 'ТТД'],
    description:
      'Разрешение на прохождение викторин, не отображаемое в интерфейсе пользователя. По данному полю возможна фильтрация.',
    type: String,
    isArray: true,
    required: false,
    enum: ['Кооледж', 'Университет', 'ТТД'],
    default: ['Кооледж', 'ТТД'],
  })
  @IsArray({ message: 'Ограничения должны быть массивом' })
  @ArrayMinSize(1, { message: 'Минимум одно ограничение должно быть указано' })
  @IsString({
    each: true,
    message:
      'Каждое значение в поле `Ограничения` ограничение должно быть строкой',
  })
  limitation: string[];

  @ApiProperty({
    example: 50,
    description:
      'Временное ограничениевикторин, отображаемое в интерфейсе пользователя. Пройти викторину можно только в течение данного времени.',
    type: Number,
    required: false,
    default: 0,
    minimum: 300,
  })
  @IsInt({
    message: 'Значение поля `Временное ограничение` должно быть числом',
  })
  @IsNotEmpty({
    message: 'Поле `Временное ограничение` обязательно для заполнения',
  })
  time_limit: number;
}

export class AddAnswerDTO {
  @ApiProperty({
    example: 'Вариант ответа',
    description: 'Ответ на вопрос',
    type: String,
    required: true,
    default: 'Вариант ответа',
  })
  @IsString({
    message: 'Значение поля `Текст ответа` должно быть строкой',
  })
  @IsNotEmpty({
    message: 'Поле `Текст ответа` обязательно для заполнения',
  })
  text: string;

  @ApiProperty({
    example: true,
    description: 'Правильность ответа (чек-бокс)',
    type: String,
    required: true,
    default: true,
  })
  @IsBoolean({
    message:
      'Значение поля `Правильность ответа`(чек-бокс) должно быть в формате true/false',
  })
  @IsNotEmpty({
    message: 'Поле `Правильность ответа`(чек-бокс) обязательно для заполнения',
  })
  flag: boolean;
}

export class AddQuestionDTO {
  @ApiProperty({
    example: 'Текст вопроса',
    description: 'Текст вопроса, отображаемое в интерфейсе пользователя',
    type: String,
    required: true,
    default: 'Текст вопроса',
  })
  @IsString({
    message: 'Значение поля `Текст вопроса` должно быть строкой',
  })
  @IsNotEmpty({
    message: 'Поле `Текст вопроса` обязательно для заполнения',
  })
  text: string;

  @ApiProperty({
    example: 'Подсказка',
    description: 'Подсказка, отображаемое в интерфейсе пользователя',
    type: String,
    required: true,
    default: 'Подсказка',
  })
  @IsString({
    message: 'Значение поля `Подсказка` должно быть строкой',
  })
  hint?: string;

  @ApiProperty({
    example: 'Текстовый',
    description:
      'Тип вопроса, не отображаемое в интерфейсе пользователя. Данное значение определяет тип варианта ответа',
    type: String,
    required: true,
    enum: ['С вариантами ответов', 'Текстовый', 'Числовой', 'Да/Нет'],
    default: 'Текстовый',
  })
  @IsString({
    each: true,
    message: 'Каждое значение поля `Тип вопроса` должно быть строкой',
  })
  @IsNotEmpty({
    message: 'Поле `Тип вопроса` обязательно для заполнения',
  })
  type: string;

  @ApiProperty({
    example: 10,
    description: 'Количество начисляемых баллов за правильный ответ',
    type: String,
    required: true,
    minimum: 10,
    default: 10,
  })
  @IsInt({
    message: 'Значение поля `Количество баллов` должно быть числом',
  })
  @IsNotEmpty({
    message: 'Поле `Количество баллов` обязательно для заполнения',
  })
  score: number;

  @ApiProperty({
    example: testAnswersData,
    description: 'Массиов ответов на вопрос',
    type: AddAnswerDTO,
    isArray: true,
    required: true,
    default: testAnswersData,
  })
  @IsArray({ message: 'Ответы должны быть массивом' })
  @ArrayMinSize(1, { message: 'Минимум один ответ должен быть указан' })
  answers: AddAnswerDTO[];
}

export class AddQuestionsDTO {
  @ApiProperty({
    example: testQuestionsData,
    description: 'Массиов вопросов викторины',
    type: AddQuestionDTO,
    isArray: true,
    required: true,
    default: testQuestionsData,
  })
  @IsArray({ message: 'Вопросы должны быть массивом' })
  @ArrayMinSize(1, { message: 'Минимум один вопрос должен быть указан' })
  questions: AddQuestionDTO[];
}
