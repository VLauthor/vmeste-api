import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfModule } from '../config/configuration.module';
import { ConfService } from '../config/configuration.service';

@Module({
  imports: [ConfModule],
  providers: [MailService, ConfService],
  exports: [MailService],
})
export class MailModule {}
