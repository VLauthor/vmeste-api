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
import { UserService } from './user.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { number, object } from 'joi';
import { threadId } from 'worker_threads';

@Controller('user')
export class UserController {
  constructor(private readonly s: UserService) {}
  @ApiOperation({ summary: 'test' })
  @ApiResponse({ status: 200, type: number })
  @Get('test')
  test() {
    return 12;
  }
  // @UsePipes(new ValidationPipe())
  // @Get('telegram/login')
  // getTelegramLogin(@Query() dto: getTelegramLoginDto) {
  //   return this.s.loginTelegramer(dto);
  // }
}
