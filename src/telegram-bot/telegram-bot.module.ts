import { Module } from '@nestjs/common';
import { TBotService } from './telegram-bot.service';
import { InlineKeyboards } from './inlinekeyboard';
import { ConfModule } from '../config/configuration.module';

import { CacheModule } from 'src/cache/cache.module';
import { DatabaseModule } from 'src/database/database.module';
import { Base64Module } from 'src/base64/base64.module';
import { BarcodeModule } from 'src/barcode/barcode.module';
import { Quiz } from './items/quiz';
import { Registration } from './items/registaration';
import { ValidatorModule } from 'src/validator/validator.module';
import { HashModule } from 'src/hash/hash.module';

@Module({
  imports: [
    CacheModule,
    DatabaseModule,
    Base64Module,
    BarcodeModule,
    ConfModule,
    InlineKeyboards,
    Quiz,
    ValidatorModule,
    HashModule,
  ],
  providers: [TBotService, InlineKeyboards, Quiz, Registration],
  exports: [TBotService, InlineKeyboards],
})
export class TBotModule {}
