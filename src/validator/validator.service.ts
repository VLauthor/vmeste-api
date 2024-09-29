import { Injectable } from '@nestjs/common';
import validator from 'validator';
@Injectable()
export class ValidatorService {
  public mail = (mail: string): boolean => {
    return validator.isEmail(mail);
  };
  public phone = (phone: string): boolean => {
    return validator.isMobilePhone(phone);
  };
  public password = (password: string): boolean => {
    return validator.isStrongPassword(password);
  };
  public nickname = (nick: string): boolean => {
    if (nick.length <= 3) return false;
    return /^[a-zA-Z]+$/.test(nick);
  };
  public date = (date: string): boolean => {
    if (!validator.isDate(date)) return false;
    if (new Date(date) > new Date()) return false;
    return true;
  };
}
