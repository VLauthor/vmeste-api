import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
  Res,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  checkCodeDto,
  createCodeDto,
  loginDto,
  signInDto,
  updatePasswordDto,
} from './auth.dto';
import * as inspector from 'node:inspector';
//потом удали
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  //Ендпоинт авторизации
  @UsePipes(new ValidationPipe())
  @Post('login')
  getLogin(@Res() res: Response, @Body() dto: loginDto) {
    return this.service.loginUser(res, dto);
  }
  //Ендпоинт регистрации
  @UsePipes(new ValidationPipe())
  @Post('signin')
  postRegistration(@Res() res: Response, @Body() dto: signInDto) {
    return this.service.signInUser(res, dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('code/create')
  postCodeCreate(@Res() res: Response, @Body() dto: createCodeDto) {
    return this.service.createCode(res, dto);
  }
  @UsePipes(new ValidationPipe())
  @Get('code/check')
  getCodeCheck(@Res() res: Response, @Query() dto: checkCodeDto) {
    return this.service.checkCode(res, dto);
  }
  @UsePipes(new ValidationPipe())
  @Post('password/update')
  updatePassword(@Res() res: Response, @Body() dto: updatePasswordDto) {
    return this.service.updatePassword(res, dto);
  }

  //create endpoint create link
  @UsePipes(new ValidationPipe())
  @Post('create')
  createLink(@Res() res: Response) {}
}
