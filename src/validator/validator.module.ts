import { Module } from '@nestjs/common';
import { ValidatorService } from './validator.service';
@Module({ exports: [ValidatorService], providers: [ValidatorService] })
export class ValidatorModule {}
