import { CacheTelegram, ChacheTelegramLogin, QuizBD, TelegramUserData } from 'src/objects/interfaces';
export declare class CacheService {
    private cacheTG;
    private usersTg;
    private userFormByReg;
    private loginTG;
    private cacheSocket;
    private arrayQuizzes;
    setQuizzes: (data: QuizBD[]) => QuizBD[];
    getAllQuizzes: () => QuizBD[];
    getOneQuizzes: (i: number) => QuizBD;
    getTG: (key: string) => CacheTelegram;
    getUsersTg: (key: number) => TelegramUserData;
    setUsersTg: (key: number, data: TelegramUserData) => Map<number, TelegramUserData>;
    setEditMessUserQuiz: (key: number, key2: string, value: number) => void;
    getEditMessUser: (key: number, key2: string) => Promise<number | false>;
    hasUsersTg: (key: number) => boolean;
    setTG: (key: string, value: CacheTelegram, ttl: number) => void;
    delTG: (key: string) => void;
    setSocket: (key: string, value: string) => void;
    updateBoolTG: (key: string, value: boolean) => void;
    setLoginTG: (key: string, value: ChacheTelegramLogin, ttl: number) => void;
    getLoginTG: (key: string) => ChacheTelegramLogin;
    deleteLoginTG: (key: string) => void;
    deleteTG: (key: string) => void;
}
