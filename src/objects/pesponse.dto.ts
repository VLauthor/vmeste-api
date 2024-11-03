import { ApiProperty } from '@nestjs/swagger';

export class GlobalErrorDTO {
  @ApiProperty({
    description: 'Описание ошибка',
    default: 'Значение поля `Название` должно быть строкой',
  })
  message: string;

  @ApiProperty({
    description: 'Ошибка',
    default: 'Bad Request',
  })
  error: string;

  @ApiProperty({
    description: 'Код ошибки',
    default: 400,
  })
  statusCode: number;
}
