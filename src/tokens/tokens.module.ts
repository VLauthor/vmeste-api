import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { ConfModule } from 'src/config/configuration.module';
import { ConfService } from 'src/config/configuration.service';
@Module({
  imports: [ConfModule],
  providers: [ConfService, TokensService],
  exports: [TokensService],
})
export class TokensModule {}
