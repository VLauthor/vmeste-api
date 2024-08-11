import {
  Controller,
  Get,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  checkCodeDto,
  createCodeDto,
  getTelegramLoginDto,
  getUserInfo,
  getValid2FA,
  getValidPersonalData,
  loginDto,
  signinDto,
  updatePasswordDto,
} from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly s: UserService) {}

  @UsePipes(new ValidationPipe())
  @Get('info')
  getInfo(@Query() dto: getUserInfo) {
    return this.s.getUserInfo(dto.session);
  }
  @UsePipes(new ValidationPipe())
  @Get('login')
  getLogin(@Query() dto: loginDto) {
    return this.s.loginUser(dto.login, dto.password);
  }
  @UsePipes(new ValidationPipe())
  @Post('signin')
  postRegistration(@Query() dto: signinDto) {
    return this.s.signInUser(dto);
  }
  @UsePipes(new ValidationPipe())
  @Get('signin/valid/personal')
  getValidPersonal(@Query() dto: getValidPersonalData) {
    return this.s.validPersonalDate(dto);
  }
  @UsePipes(new ValidationPipe())
  @Get('signin/valid/2fa')
  getValid2FA(@Query() dto: getValid2FA) {
    return this.s.valid2FA(dto);
  }
  @UsePipes(new ValidationPipe())
  @Post('code/create')
  postCodeCreate(@Query() dto: createCodeDto) {
    return this.s.createCode(dto);
  }
  @UsePipes(new ValidationPipe())
  @Get('code/check')
  getCodeCheck(@Query() dto: checkCodeDto) {
    return this.s.checkCode(dto);
  }
  @UsePipes(new ValidationPipe())
  @Put('password/update')
  updatePassword(@Query() dto: updatePasswordDto) {
    return this.s.updatePassword(dto);
  }
  // @UsePipes(new ValidationPipe())
  // @Get('telegram/login')
  // getTelegramLogin(@Query() dto: getTelegramLoginDto) {
  //   return this.s.loginTelegramer(dto);
  // }
}
