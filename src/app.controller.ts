import { Controller, Get } from '@nestjs/common';
@Controller()
export class AppController {
  @Get()
  start() {
    return { statosCode: 200, message: 'Hello! I`m Angelica Api!' };
  }
}
