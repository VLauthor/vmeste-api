import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi'; // Для валидации переменных окружения
import { ConfService } from './configuration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Делает конфигурационный модуль глобальным, чтобы не нужно было импортировать его в каждом модуле
      envFilePath: '../../.env', // Путь к вашему .env файлу
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        MAIL_HOST: Joi.string().required(),
        MAIL_HOST_USER: Joi.string().required(),
        MAIL_HOST_PASSWORD: Joi.string().required(),
        MAIL_PORT: Joi.number().default(465),
        BOT_TOKEN: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfService],
  exports: [ConfService],
})
export class ConfModule {}
