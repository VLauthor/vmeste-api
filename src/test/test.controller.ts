import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
  Res,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { TestService } from './test.service';
import { number, object } from 'joi';
import { parse } from 'cookie';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddQuestionsDTO, CreateQuizDTO } from './dto/request.dto';
import { CreateQuizResponseDTO } from './dto/response.dto';
import { GlobalErrorDTO } from 'src/objects/pesponse.dto';
import { STATUS_CODES } from 'http';

@ApiTags('Тестовый модуль')
@Controller('test')
export class TestController {
  constructor(private readonly s: TestService) {}

  @ApiOperation({
    summary: 'Создание викторины',
    description: 'Ендпоинт для создания карточки квиза.',
    tags: ['Квиз', 'Quiz'],
  })
  @ApiBody({
    type: CreateQuizDTO,
    description: 'Данные для создания викторины',
  })
  @ApiResponse({
    status: 201,
    type: CreateQuizResponseDTO,
    description: 'чв',
  })
  @ApiResponse({
    status: 400,
    type: GlobalErrorDTO,
    description: 'Резултат возвращаемый при неверном заполнении полей',
  })
  @Post('create')
  @UsePipes(new ValidationPipe())
  CreateQuiz(@Res() response: Response, @Body() dto: CreateQuizDTO) {
    const json: CreateQuizResponseDTO = { id: 123 };
    return response.status(HttpStatus.OK).json(json);
  }

  @ApiOperation({
    summary: 'Добавление вопросов к викторине.',
    description: 'Ендпоинт для добавления вопросов к викторине.',
    tags: ['Questions', 'Вопросы'],
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Идентификатор викторины',
  })
  @ApiBody({
    type: AddQuestionsDTO,
    description: 'Данные для лобавления вопросов',
  })
  @ApiResponse({
    status: 201,
    type: CreateQuizResponseDTO,
    description: 'Ответ с умпешным добавлением вопросов',
  })
  @ApiResponse({
    status: 400,
    type: GlobalErrorDTO,
    description: 'Резултат возвращаемый при неверном заполнении полей',
  })
  @Post(':id/questions/add')
  @UsePipes(new ValidationPipe())
  AddQuestions(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() dto: AddQuestionsDTO,
  ) {
    const json: CreateQuizResponseDTO = { id: 123 };
    return response.status(HttpStatus.OK).json(json);
  }

  @Get('xd')
  xd(@Res() response: Response, @Req() req: Request) {
    const myCookie1 = req.cookies['refreshToken'];
    const myCookie2 = req.cookies['accessToken'];
    response.status(200).json({ myCookie1, myCookie2 });
  }
}
