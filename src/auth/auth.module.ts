import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { HashModule } from 'src/hash/hash.module';
import { TokensModule } from 'src/tokens/tokens.module';
import { ValidatorModule } from 'src/validator/validator.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    DatabaseModule,
    ValidatorModule,
    HashModule,
    TokensModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
