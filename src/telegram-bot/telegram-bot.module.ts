import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TBotService } from './telegram-bot.service';
import { InlineKeyboard } from './inlinekeyboard';
import { ConfModule } from '../config/configuration.module';
import { ConfService } from '../config/configuration.service';
import { CacheModule } from 'src/cache/cache.module';
import { DatabaseModule } from 'src/database/database.module';
import { Base64Module } from 'src/base64/base64.module';
import { BarcodeModule } from 'src/barcode/barcode.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfModule],
      useFactory: async (configService: ConfService) => ({
        token: configService.returnTgToken(),
      }),
      inject: [ConfService],
    }),
    CacheModule,
    DatabaseModule,
    Base64Module,
    BarcodeModule,
  ],
  providers: [TBotService, InlineKeyboard],
})
export class TBotModule {}
