import { ApiProperty } from '@nestjs/swagger';
export class CreateQuizResponseDTO {
  @ApiProperty({ description: 'Индификатор квиза', default: 123 })
  id: number;
}
