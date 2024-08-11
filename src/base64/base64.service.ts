import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
@Injectable()
export class Base64Service {
  public async base64ToPng(id: number, base: string) {
    base = base.replace(/^data:image\/png;base64,/, '');

    await fs.writeFile(
      path.resolve(__dirname, `../../public/image/SHK/${id}.png`),
      base,
      'base64',
      function (err) {
        if (err) throw err;
      },
    );
  }
}
