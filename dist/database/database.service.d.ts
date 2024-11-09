import { CacheTelegram, objectUser, Reminder } from 'src/objects/interfaces';
import { PrismaService } from '../prisma/prisma.service';
export declare class DatabaseService {
    private p;
    private h;
    constructor(client: PrismaService);
    allUsers: () => Promise<{
        nickname: string;
        mail: string;
        gender: boolean;
        user_id: number;
        last_name: string;
        first_name: string;
        patronomic: string | null;
        role_id: number;
        verified: boolean;
        date_registration: Date;
        date_birthday: Date;
        password_hash: string;
    }[]>;
    returnPasswordByNickname: (nickname: string) => Promise<objectUser>;
    returnRoleName: (id: number) => Promise<string>;
    checkMail: (mail: string) => Promise<number>;
    checkRegisterNickname: (nick: string) => Promise<number>;
    checkRegisterMail: (mail: string) => Promise<number>;
    checkUserTgById: (id: number) => Promise<boolean>;
    checkTelegramVerifyById: (id: number) => Promise<boolean>;
    addTelegramVerify: (id: number, data: CacheTelegram) => Promise<{
        user_id: number;
        last_name: string | null;
        first_name: string | null;
        node_id: number;
        user_tg_id: bigint | null;
        username: string | null;
        photo_mini_url: string | null;
        photo_medium_url: string | null;
        photo_max_url: string | null;
        bio: string | null;
    }>;
    getUserIdByTelegramId: (id: number) => Promise<number | false>;
    getAllUserNotes: (userId: number) => Promise<{
        name: string;
        description: string;
        notes_id: number;
    }[]>;
    postNoteUser: (userId: number, name: string, description: string) => Promise<void>;
    deleteNoteUser: (id: number) => Promise<void>;
    getUserInfo: (id: number) => Promise<{
        nickname: string;
        mail: string;
        gender: boolean;
        last_name: string;
        first_name: string;
        patronomic: string;
        date_birthday: Date;
    }>;
    getAllRemindersCount: (id: number) => Promise<number>;
    getAllReminders: (id: number) => Promise<{
        name: string;
        description: string | null;
        user_id: number;
        reminders_id: number;
        time: Date;
    }[]>;
    getPastRemindersCount: (id: number) => Promise<number>;
    getPastReminders: (id: number) => Promise<{
        name: string;
        description: string | null;
        user_id: number;
        reminders_id: number;
        time: Date;
    }[]>;
    getFutureRemindersCount: (id: number) => Promise<number>;
    getFutureReminders: (id: number) => Promise<{
        name: string;
        description: string | null;
        user_id: number;
        reminders_id: number;
        time: Date;
    }[]>;
    addRemindersUser: (id: number, params: Reminder) => Promise<void>;
    getFirstReminders: (id: number) => Promise<{
        name: string;
        description: string | null;
        user_id: number;
        reminders_id: number;
        time: Date;
    }>;
    deleteRemindersUser: (userId: number, reminderId: number) => Promise<void>;
    getThisReminders: () => Promise<({
        user: {
            telegram: {
                user_tg_id: bigint;
            }[];
        } & {
            nickname: string;
            mail: string;
            gender: boolean;
            user_id: number;
            last_name: string;
            first_name: string;
            patronomic: string | null;
            role_id: number;
            verified: boolean;
            date_registration: Date;
            date_birthday: Date;
            password_hash: string;
        };
    } & {
        name: string;
        description: string | null;
        user_id: number;
        reminders_id: number;
        time: Date;
    })[]>;
    private formatDateString;
}
