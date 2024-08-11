import { CacheTelegram, objectUser, Reminder, Response } from 'src/objects/interfaces';
import { PrismaService } from '../prisma/prisma.service';
import { signinDto } from 'src/user/dto/user.dto';
export declare class DatabaseService {
    private p;
    private h;
    constructor(client: PrismaService);
    allUsers: () => Promise<{
        user_id: number;
        last_name: string;
        first_name: string;
        patronomic: string;
        number: string;
        mail: string;
        nickname: string;
        gender: boolean;
        date_birthday: Date;
        password_hash: string;
    }[]>;
    returnPasswordByNickname: (nickname: string) => Promise<objectUser>;
    returnPasswordByMail: (mail: string) => Promise<objectUser>;
    newUser: (user: signinDto) => Promise<Response>;
    createSession: (session: string, userId: any) => Promise<void>;
    returnUserIdByMail: (mail: string) => Promise<number>;
    addCodeMail: (userId: number, key: string) => Promise<void>;
    checkMail: (mail: string) => Promise<number>;
    checkCodeUser: (userId: number, code: string) => Promise<Date>;
    updatePassword: (userId: number, password_hash: string) => Promise<void>;
    checkRegisterNickname: (nick: string) => Promise<number>;
    checkRegisterMail: (mail: string) => Promise<number>;
    checkRegisterPhome: (phone: string) => Promise<number>;
    getIdBySession: (session: string) => Promise<number>;
    checkUserTgById: (id: number) => Promise<boolean>;
    checkTelegramVerifyById: (id: number) => Promise<boolean>;
    addTelegramVerify: (id: number, data: CacheTelegram) => Promise<{
        node_id: number;
        user_tg_id: bigint;
        user_id: number;
        first_name: string;
        last_name: string;
        username: string;
        photo_mini_url: string;
        photo_medium_url: string;
        photo_max_url: string;
        bio: string;
    }>;
    getUserIdByTelegramId: (id: number) => Promise<number | false>;
    getUserIdBySession: (session: string) => Promise<number | false>;
    getAllUserNotes: (userId: number) => Promise<{
        name: string;
        description: string;
        notes_id: number;
    }[]>;
    postNoteUser: (userId: number, name: string, description: string) => Promise<void>;
    deleteNoteUser: (id: number) => Promise<void>;
    getUserInfo: (id: number) => Promise<{
        number: string;
        last_name: string;
        first_name: string;
        patronomic: string;
        mail: string;
        nickname: string;
        gender: boolean;
        date_birthday: Date;
    }>;
    getAllRemindersCount: (id: number) => Promise<number>;
    getAllReminders: (id: number) => Promise<{
        reminders_id: number;
        user_id: number;
        name: string;
        time: Date;
        description: string;
    }[]>;
    getPastRemindersCount: (id: number) => Promise<number>;
    getPastReminders: (id: number) => Promise<{
        reminders_id: number;
        user_id: number;
        name: string;
        time: Date;
        description: string;
    }[]>;
    getFutureRemindersCount: (id: number) => Promise<number>;
    getFutureReminders: (id: number) => Promise<{
        reminders_id: number;
        user_id: number;
        name: string;
        time: Date;
        description: string;
    }[]>;
    addRemindersUser: (id: number, params: Reminder) => Promise<void>;
}
