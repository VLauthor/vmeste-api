import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CacheTelegram,
  DatabaseResult,
  objectUser,
  Payload,
  Questions,
  Quiz,
  Reminder,
} from 'src/objects/interfaces';
import { PrismaService } from '../prisma/prisma.service';
import { signInDto } from 'src/auth/auth.dto';
import { HashService } from '../hash/hash.service';
import { title } from 'process';
import { message } from 'src/string/string';
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
  public returnRoleName = async (id: number): Promise<string> => {
    const role = await this.p.role.findUnique({
      where: { id: id },
      select: { role: true },
    });
    return role.role;
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
  public getFirstReminders = async (id: number) => {
    return await this.p.reminders.findFirst({
      where: {
        user_id: id,
        time: {
          gt: new Date(),
        },
      },
      orderBy: {
        time: 'asc',
      },
    });
  };
  public deleteRemindersUser = async (userId: number, reminderId: number) => {
    await this.p.reminders.delete({
      where: { user_id: userId, reminders_id: reminderId },
    });
  };
  public getThisReminders = async () => {
    const now = new Date();
    const startOfMinute = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours() + 3,
      now.getMinutes(),
      0,
      0,
    );
    const endOfMinute = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours() + 3,
      now.getMinutes(),
      59,
      999,
    );
    return await this.p.reminders.findMany({
      where: {
        time: {
          gte: startOfMinute,
          lte: endOfMinute,
        },
      },
      include: {
        user: {
          include: {
            telegram: {
              select: {
                user_tg_id: true,
              },
            },
          },
        },
      },
    });
  };
  public addQuiz = async (id: number, quiz: Quiz, questions: Questions[]) => {
    const idQuiz = await this.p.quiz.create({
      data: {
        author_id: id,
        title: quiz.title,
        description: quiz.description,
        private: quiz.mode === 'private' ? true : false,
        key: quiz.mode === 'private' ? quiz.key : null,
      },
      select: { quiz_id: true },
    });
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const idQuestion = await this.p.questions.create({
        data: { quiz_id: idQuiz.quiz_id, title: question.title },
        select: { question_id: true },
      });
      for (let j = 0; j < question.answers.length; j++) {
        const answer = question.answers[j];
        await this.p.answers.create({
          data: {
            question_id: idQuestion.question_id,
            title: answer.title,
            correct: answer.correct,
          },
        });
      }
    }
  };
  public GetAllQuiz = async () => {
    return await this.p.quiz.findMany({
      select: {
        quiz_id: true,
        title: true,
        description: true,
        private: true,
        key: true,
        question: {
          select: {
            title: true,
            answers: {
              select: {
                answer_id: true,
                title: true,
                correct: true,
              },
            },
          },
        },
      },
    });
  };
  private formatDateString(date: Date): { date: string; time: string } {
    const day = String(date.getUTCDate()).padStart(2, '0'); // Получаем день
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Получаем месяц (месяцы начинаются с 0)
    const year = date.getUTCFullYear(); // Получаем год
    const hours = String(date.getUTCHours()).padStart(2, '0'); // Получаем часы
    const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // Получаем минуты
    const second = String(date.getUTCSeconds()).padStart(2, '0'); // Получаем минуты
    return {
      date: `${day}.${month}.${year}`,
      time: `${hours}:${minutes}:${second}`,
    };
  }
}
// https://79.174.86.224:3000/api/user/login?login=asteroidjjj@gmail.com&password=d43rif_Dd43rjf_D
