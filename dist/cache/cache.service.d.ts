import { CacheTelegram, ChacheTelegramLogin } from 'src/objects/interfaces';
export declare class CacheService {
    private cacheTG;
    private loginTG;
    private cacheSocket;
    getTG: (key: string) => CacheTelegram;
    setTG: (key: string, value: CacheTelegram, ttl: number) => void;
    delTG: (key: string) => void;
    setSocket: (key: string, value: string) => void;
    updateBoolTG: (key: string, value: boolean) => void;
    setLoginTG: (key: string, value: ChacheTelegramLogin, ttl: number) => void;
    getLoginTG: (key: string) => ChacheTelegramLogin;
    deleteLoginTG: (key: string) => void;
    deleteTG: (key: string) => void;
}
