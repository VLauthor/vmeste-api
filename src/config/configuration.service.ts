import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfService {
  constructor(private configService: ConfigService) {}

  returnUrlDb() {
    return this.configService.get<string>('DATABASE_URL');
  }

  returnMailHostConfig() {
    return this.configService.get<string>('MAIL_HOST');
  }

  returnMailHostUserConfig() {
    return this.configService.get<string>('MAIL_HOST_USER');
  }

  returnMailPasswordConfig() {
    return this.configService.get<string>('MAIL_HOST_PASSWORD');
  }

  returnMailPortConfig() {
    return this.configService.get<number>('MAIL_PORT');
  }

  returnTgToken() {
    return this.configService.get<string>('BOT_TOKEN');
  }
}
