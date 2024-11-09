import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GlobalErrorDTO, ResponseInt } from 'src/objects/pesponse.dto';
import {
  checkCodeDto,
  createCodeDto,
  loginDto,
  signInDto,
  updatePasswordDto,
} from './auth.dto';
import { AuthService } from './auth.service';
@ApiTags('Авторизация и регистрация')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  //Ендпоинт авторизации
  @ApiOperation({
    summary: 'Авторизация пользователя',
    description: 'Ендпоинт для авторизации пользователя',
    tags: ['Авторизация', 'login'],
  })
  @ApiBody({
    type: loginDto,
    description: 'Данные для авторизации',
  })
  @ApiResponse({
    status: 400,
    type: GlobalErrorDTO,
    description: 'Результат возвращаемый при неверном заполнении полей',
  })
  @ApiResponse({
    status: 200,
    type: ResponseInt,
    description: 'Результат возвращаемый при успешной авторизации',
  })
  @UsePipes(new ValidationPipe())
  @Post('login')
  getLogin(@Res() res: Response, @Body() dto: loginDto) {
    return this.service.loginUser(res, dto);
  }

  @ApiOperation({
    summary: 'Регистрация пользователя',
    description: 'Ендпоинт для регистрации пользователя',
    tags: ['Регистрация', 'signin'],
  })
  @ApiBody({
    type: signInDto,
    description: 'Данные для регистрации',
  })
  @ApiResponse({
    status: 400,
    type: GlobalErrorDTO,
    description: 'Результат возвращаемый при неверном заполнении полей',
  })
  @ApiResponse({
    status: 200,
    type: ResponseInt,
    description: 'Результат возвращаемый при успешной регистрации',
  })
  @UsePipes(new ValidationPipe())
  @Post('signin')
  postRegistration(@Res() res: Response, @Body() dto: signInDto) {
    return this.service.signInUser(res, dto);
  }

  @ApiOperation({
    summary: 'Получение кода',
    description: 'Создание кода для восстановления пароля',
    tags: ['Код', 'code'],
  })
  @ApiBody({
    type: createCodeDto,
    description: 'Данные для операции',
  })
  @ApiResponse({
    status: 400,
    type: GlobalErrorDTO,
    description: 'Результат возвращаемый при неверном заполнении полей',
  })
  @ApiResponse({
    status: 200,
    type: ResponseInt,
    description: 'Результат возвращаемый при отправке кода',
  })
  @UsePipes(new ValidationPipe())
  @Post('code/create')
  postCodeCreate(@Res() res: Response, @Body() dto: createCodeDto) {
    return this.service.createCode(res, dto);
  }

  @ApiOperation({
    summary: 'Проверка кода для смены пароля пользователя',
    description: 'Ендпоинт для проверка кода для смены пароля пользователя',
    tags: ['Смена пароль', 'edit password'],
  })
  @ApiResponse({
    status: 400,
    type: GlobalErrorDTO,
    description: 'Результат возвращаемый при неверном заполнении полей',
  })
  @ApiResponse({
    status: 200,
    type: ResponseInt,
    description: 'Результат возвращаемый при успешной авторизации',
  })
  @UsePipes(new ValidationPipe())
  @Get('code/check')
  getCodeCheck(@Res() res: Response, @Query() dto: checkCodeDto) {
    return this.service.checkCode(res, dto);
  }

  @ApiOperation({
    summary: 'Изменение пароля',
    description: 'Изменение пароля',
    tags: ['Смена пароль', 'edit password'],
  })
  @ApiBody({
    type: updatePasswordDto,
    description: 'Данные для операции',
  })
  @ApiResponse({
    status: 400,
    type: GlobalErrorDTO,
    description: 'Результат возвращаемый при неверном заполнении полей',
  })
  @ApiResponse({
    status: 200,
    type: ResponseInt,
    description: 'Результат возвращаемый при отправке кода',
  })
  @UsePipes(new ValidationPipe())
  @Post('password/update')
  updatePassword(@Res() res: Response, @Body() dto: updatePasswordDto) {
    return this.service.updatePassword(res, dto);
  }

  @Post('test')
  test(@Res() res: Response) {
    return this.service.test(res);
  }
}
