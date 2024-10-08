import { CacheTelegram, objectUser, Questions, Quiz, Reminder, Response } from 'src/objects/interfaces';
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
        patronomic: string | null;
        number: string | null;
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
        user_tg_id: bigint | null;
        user_id: number;
        first_name: string | null;
        last_name: string | null;
        username: string | null;
        photo_mini_url: string | null;
        photo_medium_url: string | null;
        photo_max_url: string | null;
        bio: string | null;
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
        nickname: string;
        mail: string;
        last_name: string;
        first_name: string;
        patronomic: string;
        gender: boolean;
        date_birthday: Date;
    }>;
    getAllRemindersCount: (id: number) => Promise<number>;
    getAllReminders: (id: number) => Promise<{
        reminders_id: number;
        user_id: number;
        name: string;
        time: Date;
        description: string | null;
    }[]>;
    getPastRemindersCount: (id: number) => Promise<number>;
    getPastReminders: (id: number) => Promise<{
        reminders_id: number;
        user_id: number;
        name: string;
        time: Date;
        description: string | null;
    }[]>;
    getFutureRemindersCount: (id: number) => Promise<number>;
    getFutureReminders: (id: number) => Promise<{
        reminders_id: number;
        user_id: number;
        name: string;
        time: Date;
        description: string | null;
    }[]>;
    addRemindersUser: (id: number, params: Reminder) => Promise<void>;
    getFirstReminders: (id: number) => Promise<{
        reminders_id: number;
        user_id: number;
        name: string;
        time: Date;
        description: string | null;
    }>;
    deleteRemindersUser: (userId: number, reminderId: number) => Promise<void>;
    getThisReminders: () => Promise<({
        user: {
            telegram: {
                user_tg_id: bigint;
            }[];
        } & {
            user_id: number;
            last_name: string;
            first_name: string;
            patronomic: string | null;
            number: string | null;
            mail: string;
            nickname: string;
            gender: boolean;
            date_birthday: Date;
            password_hash: string;
        };
    } & {
        reminders_id: number;
        user_id: number;
        name: string;
        time: Date;
        description: string | null;
    })[]>;
    addQuiz: (id: number, quiz: Quiz, questions: Questions[]) => Promise<void>;
    GetAllQuiz: () => Promise<{
        private: boolean;
        description: string;
        key: string;
        quiz_id: number;
        title: string;
        question: {
            answers: {
                title: string;
                answer_id: number;
                correct: boolean;
            }[];
            title: string;
        }[];
    }[]>;
    private formatDateString;
}
