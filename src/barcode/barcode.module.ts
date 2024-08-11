import { Module } from '@nestjs/common';
import { BarcodeService } from './barcode.service';

@Module({
  providers: [BarcodeService],
  exports: [BarcodeService],
})
export class BarcodeModule {}
