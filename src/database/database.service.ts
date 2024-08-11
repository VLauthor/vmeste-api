import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CacheTelegram,
  objectUser,
  Reminder,
  Response,
} from 'src/objects/interfaces';
import { PrismaService } from '../prisma/prisma.service';
import { signinDto } from 'src/user/dto/user.dto';
import { HashService } from '../hash/hash.service';
@Injectable()
export class DatabaseService {
  private p: PrismaService;
  private h;
  constructor(client: PrismaService) {
    this.p = client;
    this.h = HashService;
  }
  public allUsers = async () => {
    return await this.p.users.findMany();
  };
  public returnPasswordByNickname = async (
    nickname: string,
  ): Promise<objectUser> => {
    const result: objectUser = await this.p.users.findUnique({
      where: { nickname: nickname },
      select: { user_id: true, password_hash: true },
    });
    return result;
  };
  public returnPasswordByMail = async (mail: string): Promise<objectUser> => {
    const result: objectUser = await this.p.users.findUnique({
      where: { mail: mail },
      select: { user_id: true, password_hash: true },
    });
    return result;
  };
  public newUser = async (user: signinDto): Promise<Response> => {
    try {
      const user_id = await this.p.users.create({
        data: {
          last_name: user.last_name,
          first_name: user.first_name,
          patronomic: user.patronomic,
          number: user.number,
          mail: user.mail,
          nickname: user.nickname,
          gender: user.gender,
          date_birthday: user.date_birthday,
          password_hash: user.password,
        },
        select: { user_id: true },
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: user_id.user_id.toString(),
      };
    } catch (e: any) {
      if (e.code && e.code === 'P2002') {
        const fields = e.meta?.target;
        return {
          statusCode: HttpStatus.CONFLICT,
          error: `Duplicate fields: ${fields.join(', ')}`,
        };
      }
      return {
        statusCode: HttpStatus.PRECONDITION_FAILED,
        error: 'An unexpected error',
      };
    }
  };
  public createSession = async (session: string, userId) => {
    const currentTime = new Date();
    const futureTime = new Date(
      currentTime.setHours(currentTime.getHours() + 3),
    );
    await this.p.sessions.create({
      data: {
        session_id: session,
        user_id: userId,
        session_create: futureTime,
      },
    });
  };
  public returnUserIdByMail = async (mail: string) => {
    const userId = await this.p.users.findUnique({
      where: { mail: mail },
      select: { user_id: true },
    });
    if (userId) return userId.user_id;
    return null;
  };
  public addCodeMail = async (userId: number, key: string) => {
    const date = new Date();
    const hours = date.getHours() + 3;
    date.setHours(hours);
    console.log(date);
    await this.p.code.upsert({
      where: { user_id: userId },
      update: { key: key, date_create: date },
      create: {
        user_id: userId,
        key: key,
      },
    });
  };
  public checkMail = async (mail: string) => {
    return await this.p.users.count({ where: { mail: mail } });
  };
  public checkCodeUser = async (userId: number, code: string) => {
    const r = await this.p.code.findUnique({
      where: { user_id: userId, key: code },
      select: {
        date_create: true,
      },
    });
    if (r) return r.date_create;
    return null;
  };
  public updatePassword = async (userId: number, password_hash: string) => {
    await this.p.users.update({
      where: { user_id: userId },
      data: { password_hash: password_hash },
    });
  };
  public checkRegisterNickname = async (nick: string) => {
    return await this.p.users.count({ where: { nickname: nick } });
  };
  public checkRegisterMail = async (mail: string) => {
    return await this.p.users.count({ where: { mail: mail } });
  };
  public checkRegisterPhome = async (phone: string) => {
    return await this.p.users.count({ where: { number: phone } });
  };
  public getIdBySession = async (session: string): Promise<number> => {
    const id = await this.p.sessions.findUnique({
      where: { session_id: session },
    });
    if (id) return id.user_id;
    return null;
  };
  public checkUserTgById = async (id: number): Promise<boolean> => {
    return (await this.p.telegram_Users.count({ where: { user_id: id } })) != 0
      ? true
      : false;
  };
  public checkTelegramVerifyById = async (id: number) => {
    return (await this.p.telegram_Users.count({ where: { user_id: id } })) != 0
      ? true
      : false;
  };
  public addTelegramVerify = async (id: number, data: CacheTelegram) => {
    return await this.p.telegram_Users.create({
      data: {
        user_id: id,
        user_tg_id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        photo_max_url: data.photo_max_url,
        photo_medium_url: data.photo_medium_url,
        photo_mini_url: data.photo_mini_url,
        bio: data.bio,
      },
    });
  };
  public getUserIdByTelegramId = async (
    id: number,
  ): Promise<number | false> => {
    const userId = await this.p.telegram_Users.findUnique({
      where: { user_tg_id: id },
      select: { user_id: true },
    });
    if (!userId) return false;
    return userId.user_id;
  };
  public getUserIdBySession = async (
    session: string,
  ): Promise<number | false> => {
    const user_id = await this.p.sessions.findUnique({
      where: { session_id: session },
      select: { user_id: true },
    });
    if (!user_id) return false;
    return user_id.user_id;
  };
  public getAllUserNotes = async (userId: number) => {
    return await this.p.notes.findMany({
      where: { user_id: userId },
      select: { notes_id: true, name: true, description: true },
    });
  };
  public postNoteUser = async (
    userId: number,
    name: string,
    description: string,
  ) => {
    await this.p.notes.create({
      data: { user_id: userId, name: name, description: description },
    });
  };
  public deleteNoteUser = async (id: number) => {
    await this.p.notes.delete({ where: { notes_id: id } });
  };
  public getUserInfo = async (id: number) => {
    return await this.p.users.findUnique({
      where: { user_id: id },
      select: {
        last_name: true,
        first_name: true,
        patronomic: true,
        number: true,
        mail: true,
        nickname: true,
        gender: true,
        date_birthday: true,
      },
    });
  };
  public getAllRemindersCount = async (id: number) => {
    return await this.p.reminders.count({
      where: { user_id: id },
    });
  };
  public getAllReminders = async (id: number) => {
    return await this.p.reminders.findMany({
      where: { user_id: id },
    });
  };
  public getPastRemindersCount = async (id: number) => {
    return await this.p.reminders.count({
      where: {
        user_id: id,
        time: {
          lt: new Date(),
        },
      },
    });
  };
  public getPastReminders = async (id: number) => {
    return await this.p.reminders.findMany({
      where: {
        user_id: id,
        time: {
          lt: new Date(),
        },
      },
    });
  };
  public getFutureRemindersCount = async (id: number) => {
    return await this.p.reminders.count({
      where: {
        user_id: id,
        time: {
          gt: new Date(),
        },
      },
    });
  };
  public getFutureReminders = async (id: number) => {
    return await this.p.reminders.findMany({
      where: {
        user_id: id,
        time: {
          gt: new Date(),
        },
      },
    });
  };
  public addRemindersUser = async (id: number, params: Reminder) => {
    const date = params.date.split('.');
    const time = params.time.split(':');

    const formattedDate = new Date(
      Date.UTC(
        parseInt(date[2]), // Год
        parseInt(date[1]) - 1, // Месяц (с нуля)
        parseInt(date[0]), // Дата
        parseInt(time[0]), // Часы
        parseInt(time[1]), // Минуты
      ),
    );
    await this.p.reminders.create({
      data: {
        user_id: id,
        name: params.title,
        description: params.description,
        time: formattedDate,
      },
    });
  };
}
// https://79.174.86.224:3000/api/user/login?login=asteroidjjj@gmail.com&password=d43rif_Dd43rjf_D
