import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { ConfService } from 'src/config/configuration.service';
import { Payload } from 'src/objects/interfaces';
@Injectable()
export class TokensService {
  constructor(private config: ConfService) {}
  private accessSalt: string = this.config.returnAccessSalt();
  private refreshSalt: string = this.config.returnRefreshSalt();

  public createRefreshToken = (payload: Payload): string => {
    return jwt.sign(payload, this.refreshSalt, { expiresIn: '14d' });
  };

  public verifyRefreshToken = (token: string): number | null => {
    try {
      const result = jwt.verify(token, this.refreshSalt) as Payload;
      return result.id;
    } catch (e) {
      return null;
    }
  };

  public createAccessToken = (payload: Payload) => {
    return jwt.sign(payload, this.accessSalt, { expiresIn: '15m' });
  };

  public verifyAccessToken = (token: string): number | null => {
    try {
      const result = jwt.verify(token, this.accessSalt) as Payload;
      return result.id;
    } catch (e) {
      return null;
    }
  };
}
