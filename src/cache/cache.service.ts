import { Injectable } from '@nestjs/common';
import { number } from 'joi';
import {
  CacheTelegram,
  ChacheTelegramLogin,
  QuizBD,
  TelegramUserData,
} from 'src/objects/interfaces';
@Injectable()
export class CacheService {
  private cacheTG: Map<string, CacheTelegram> = new Map();
  private usersTg: Map<number, TelegramUserData> = new Map<
    number,
    TelegramUserData
  >();
  private loginTG: Map<string, ChacheTelegramLogin> = new Map();
  private cacheSocket: Map<string, string> = new Map();
  private arrayQuizzes: Array<QuizBD> = [];
  public setQuizzes = (data: QuizBD[]) => (this.arrayQuizzes = data);
  public getAllQuizzes = () => this.arrayQuizzes;
  public getOneQuizzes = (i: number) => this.arrayQuizzes[i];
  public getTG = (key: string): CacheTelegram => {
    return this.cacheTG.get(key);
  };
  public getUsersTg = (key: number) => this.usersTg.get(key);
  public setUsersTg = (key: number, data: TelegramUserData) =>
    this.usersTg.set(key, data);
  public setEditMessUserQuiz = (key: number, key2: string, value: number) => {
    console.log(key, key2, value);
    if (!this.usersTg.get(key).editMess) this.usersTg.get(key).editMess = {};
    this.usersTg.get(key).editMess.quiz = value;
  };
  public getEditMessUser = async (key: number, key2: string) => {
    if (!this.usersTg.get(key).editMess || !this.usersTg.get(key).editMess.quiz)
      return false;
    return this.usersTg.get(key).editMess.quiz;
  };
  public hasUsersTg = (key: number) => this.usersTg.has(key);
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
