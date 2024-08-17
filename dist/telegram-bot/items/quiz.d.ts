import { Composer, Context } from 'grammy';
import { CacheService } from 'src/cache/cache.service';
import { InlineKeyboards } from '../inlinekeyboard';
import { TelegramUserData } from 'src/objects/interfaces';
import { DatabaseService } from 'src/database/database.service';
export declare class Quiz {
    private c;
    private ink;
    private dbs;
    constructor(c: CacheService, ink: InlineKeyboards, dbs: DatabaseService);
    private init;
    checkQuizData: (ctx: Context, user: TelegramUserData) => Promise<boolean>;
    getComposer(): Composer<Context>;
    setQuizzes(): Promise<void>;
}
