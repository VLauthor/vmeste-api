import { ConfigService } from '@nestjs/config';
export declare class ConfService {
    private configService;
    constructor(configService: ConfigService);
    returnUrlDb(): string;
    returnMailHostConfig(): string;
    returnMailHostUserConfig(): string;
    returnMailPasswordConfig(): string;
    returnMailPortConfig(): number;
    returnTgToken(): string;
    returnAccessSalt(): string;
    returnRefreshSalt(): string;
}
