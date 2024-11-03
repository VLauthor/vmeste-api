import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { ConfModule } from 'src/config/configuration.module';
import { ConfService } from 'src/config/configuration.service';
import { TestController } from './test.controller';
@Module({
  imports: [ConfModule],
  providers: [ConfService, TestService],
  controllers: [TestController],
  exports: [TestService],
})
export class TestModule {}
