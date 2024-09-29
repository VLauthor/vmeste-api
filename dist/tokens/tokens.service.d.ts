import { ConfService } from 'src/config/configuration.service';
import { Payload } from 'src/objects/interfaces';
export declare class TokensService {
    private config;
    constructor(config: ConfService);
    private accessSalt;
    private refreshSalt;
    createRefreshToken: (payload: Payload) => string;
    verifyRefreshToken: (token: string) => number | null;
    createAccessToken: (payload: Payload) => string;
    verifyAccessToken: (token: string) => number | null;
}
