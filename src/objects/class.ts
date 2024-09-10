import { differenceInMinutes } from 'date-fns';
import { CustomDate } from './interfaces';
import { ConfService } from 'src/config/configuration.service';
export class UserTelegram {
  public user_tg_id: number;
  public first_name: string;
  public last_name?: string;
  public username?: string;

  constructor(
    id: number,
    first_name: string,
    last_name?: string,
    username?: string,
  ) {
    this.user_tg_id = id;
    this.first_name = first_name;
    if (last_name) this.last_name = last_name;
    if (username) this.username = username;
  }
  public returnPublicJson() {
    return {
      first_name: this.first_name,
      last_name: this.last_name,
      username: this.username,
    };
  }
  public returnPublicInfoString() {
    return `Фамилия: ${this.first_name},\n${this.last_name ? 'Имя: ' + this.last_name + ',\n' : ''}${this.username ? 'Никнейм: ' + this.username : ''}`;
  }
  public returnPrivateJson() {
    return this;
  }
  public log() {
    console.log(this);
  }
}
export class DataTelegramKey {
  private key: string;
  constructor(key: string) {
    this.key = key;
  }
}

export class Random {
  private length: number;
  constructor(length: number) {
    this.length = length;
  }
  public generateString = async () => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < this.length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  };
  public generateCode = async () => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < this.length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
}
export class CheckWidthTime {
  private date: Date;
  constructor(date: Date) {
    this.date = date;
  }
  public minutes = (time: number) => {
    const newDate = new Date();
    newDate.setHours(newDate.getHours() + 3);
    const difference = Math.abs(differenceInMinutes(newDate, this.date));
    return difference <= time;
  };
}

export class formatDate {
  private year: number | null;
  private month: number | null;
  private day: number | null;

  constructor(date: CustomDate) {
    const { year, month, day } = date;
    this.year = year;
    this.month = month;
    this.day = day;
  }
  public returnViewDate = (): string => {
    return `${this.day !== null ? this.day : 'дд'}.${this.month !== null ? this.month : 'мм'}.${this.year !== null ? this.year : 'гггг'}`;
  };

  public returnDBDate = (): string => {
    return new Date(`${this.year}-${this.month}-${this.day}`).toISOString();
  };

  public checkCorrectDate = (): boolean => {
    if (this.year === null || this.month === null || this.day === null)
      return false;
    return true;
  };
}
