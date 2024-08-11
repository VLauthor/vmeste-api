import { Injectable } from '@nestjs/common';
import { CacheTelegram, ChacheTelegramLogin } from 'src/objects/interfaces';
@Injectable()
export class CacheService {
  private cacheTG: Map<string, CacheTelegram> = new Map();
  private loginTG: Map<string, ChacheTelegramLogin> = new Map();
  private cacheSocket: Map<string, string> = new Map();
  public getTG = (key: string): CacheTelegram => {
    return this.cacheTG.get(key);
  };
  public setTG = (key: string, value: CacheTelegram, ttl: number) => {
    this.cacheTG.set(key, value);
    setTimeout(
      () => {
        this.cacheTG.delete(key);
      },
      ttl * 60 * 1000,
    );
  };
  public delTG = (key: string) => {
    this.cacheTG.delete(key);
  };
  public setSocket = (key: string, value: string) => {
    this.cacheSocket.set(key, value);
  };
  public updateBoolTG = (key: string, value: boolean) => {
    const lettetData: CacheTelegram = this.cacheTG.get(key);
    lettetData.bool = value;
    setTimeout(() => {
      this.cacheTG.delete(key);
    }, 10000);
    this.cacheTG.set(key, lettetData);
  };
  public setLoginTG = (
    key: string,
    value: ChacheTelegramLogin,
    ttl: number,
  ) => {
    this.loginTG.set(key, value);
    setTimeout(
      () => {
        this.loginTG.delete(key);
      },
      ttl * 60 * 1000,
    );
  };
  public getLoginTG = (key: string) => {
    return this.loginTG.get(key);
  };
  public deleteLoginTG = (key: string) => {
    this.loginTG.delete(key);
  };

  public deleteTG = (key: string) => {
    this.cacheTG.delete(key);
  };
}
