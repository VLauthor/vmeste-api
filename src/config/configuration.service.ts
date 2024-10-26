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

  returnTgToken(): string {
    return this.configService.get<string>('BOT_TOKEN');
  }

  returnAccessSalt(): string {
    return this.configService.get<string>('ACCESS_SALT');
  }

  returnRefreshSalt(): string {
    return this.configService.get<string>('REFRESH_SALT');
  }
}
