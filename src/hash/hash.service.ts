import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  private readonly saltRounds: number = 10;

  public async createHash(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(data, salt);
  }
  public async checkHash(data: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(data, hash);
  }
}
