import { Injectable } from '@nestjs/common';
import { SymbologyType, createStream } from 'symbology';
@Injectable()
export class BarcodeService {
  public async generateBarcode(text: string) {
    const { data } = await createStream(
      {
        symbology: SymbologyType.CODE128,
      },
      text,
    );
    return data;
  }
  public async generateQRcode(text: string) {
    const { data } = await createStream(
      {
        symbology: SymbologyType.QRCODE,
      },
      text,
    );
    return data;
  }
}
