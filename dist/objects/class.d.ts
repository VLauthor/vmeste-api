import { CustomDate } from './interfaces';
export declare class UserTelegram {
    user_tg_id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    constructor(id: number, first_name: string, last_name?: string, username?: string);
    returnPublicJson(): {
        first_name: string;
        last_name: string;
        username: string;
    };
    returnPublicInfoString(): string;
    returnPrivateJson(): this;
    log(): void;
}
export declare class DataTelegramKey {
    private key;
    constructor(key: string);
}
export declare class Random {
    private length;
    constructor(length: number);
    generateString: () => Promise<string>;
    generateCode: () => Promise<string>;
}
export declare class CheckWidthTime {
    private date;
    constructor(date: Date);
    minutes: (time: number) => boolean;
}
export declare class formatDate {
    private year;
    private month;
    private day;
    constructor(date: CustomDate);
    returnViewDate: () => string;
    returnDBDate: () => string;
    checkCorrectDate: () => boolean;
}
