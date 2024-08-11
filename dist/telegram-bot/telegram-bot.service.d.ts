import { Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';
import { InlineKeyboard } from './inlinekeyboard';
import { CacheService } from 'src/cache/cache.service';
import { DatabaseService } from 'src/database/database.service';
import { BarcodeService } from 'src/barcode/barcode.service';
import { Base64Service } from 'src/base64/base64.service';
export declare class TBotService {
    private readonly cache;
    private configService;
    private ik;
    private db;
    private bc;
    private bs64;
    private bot;
    private users;
    private reactionMess;
    private editMess;
    constructor(cache: CacheService, configService: ConfigService, ik: InlineKeyboard, db: DatabaseService, bc: BarcodeService, bs64: Base64Service, bot: Telegraf);
    onStart(): void;
    private addListMessage;
    private addListEditMessage;
    private getItemListMess;
    private getItemListEditMess;
    private setInpDateUser;
    private checkExistData;
    private checkExistUserData;
}
