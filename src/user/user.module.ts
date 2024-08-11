import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ValidatorModule } from 'src/validator/validator.module';
import { HashModule } from 'src/hash/hash.module';
import { MailModule } from 'src/mail/mail.module';
import { TBotModule } from 'src/telegram-bot/telegram-bot.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
@Module({
  imports: [
    DatabaseModule,
    ValidatorModule,
    HashModule,
    MailModule,
    TBotModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
