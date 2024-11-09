import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { ConfModule } from 'src/config/configuration.module';
import { ConfService } from 'src/config/configuration.service';
import { TestController } from './test.controller';
import { DatabaseModule } from 'src/database/database.module';
@Module({
  imports: [ConfModule, DatabaseModule],
  providers: [ConfService, TestService],
  controllers: [TestController],
  exports: [TestService],
})
export class TestModule {}
