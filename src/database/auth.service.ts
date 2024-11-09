import { Injectable } from '@nestjs/common';
import { signInDto } from 'src/auth/auth.dto';
import { DatabaseResult, objectUser, Payload } from 'src/objects/interfaces';
import { HashService } from '../hash/hash.service';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class AuthDatabaseService {
  private p: PrismaService;
  private h;
  constructor(client: PrismaService) {
    this.p = client;
    this.h = HashService;
  }

  public returnPasswordByMail = async (mail: string): Promise<objectUser> => {
    const result: objectUser = await this.p.users.findUnique({
      where: { mail: mail },
      select: { user_id: true, password_hash: true },
    });
    return result;
  };

  public newUser = async (data: signInDto): Promise<DatabaseResult> => {
    try {
      const initials = data.initials.split(' ');
      const userCreate = await this.p.users.create({
        data: {
          last_name: initials[0],
          first_name: initials[1],
          patronomic: initials[2] === undefined ? null : initials[2],
          mail: data.email,
          nickname: data.nickname,
          gender: data.gender,
          date_birthday: new Date(data.date),
          password_hash: data.password,
        },
        select: { user_id: true, role: { select: { role: true } } },
      });
      console.log(userCreate);

      const payload: Payload = {
        id: userCreate.user_id,
        role: userCreate.role.role,
      };
      return {
        accept: {
          data: {
            payload: payload,
          },
          message: 'Успешная авторизация',
        },
      };
    } catch (e: any) {
      console.log(e);

      if (e.code && e.code === 'P2002') {
        const fields = e.meta?.target;
        return {
          error: {
            message: `Данные из следующих полей уже зарегистрированы: ${fields.join(', ')}`,
          },
        };
      }
      return {
        error: { message: 'An unexpected error' },
      };
    }
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
}
