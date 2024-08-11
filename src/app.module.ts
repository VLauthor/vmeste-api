import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ValidatorModule } from './validator/validator.module';
import { MailModule } from './mail/mail.module';
import { TBotModule } from './telegram-bot/telegram-bot.module';
import { ConfModule } from './config/configuration.module';
import { ConfService } from './config/configuration.service';
import { TelegramModule } from './telegram/telegram.module';
import { WebsocketModule } from './websocket/websocket.module';
import { CacheModule } from './cache/cache.module';
import { NotesModule } from './notes/notes.module';
import { Base64Module } from './base64/base64.module';
import { BarcodeModule } from './barcode/barcode.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ValidatorModule,
    MailModule,
    TBotModule,
    ConfModule,
    TelegramModule,
    WebsocketModule,
    CacheModule,
    NotesModule,
    Base64Module,
    BarcodeModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfService],
  exports: [],
})
export class AppModule {}
