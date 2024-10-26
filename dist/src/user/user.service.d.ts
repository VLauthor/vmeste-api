import { DatabaseService } from '../database/database.service';
import { ValidatorService } from '../validator/validator.service';
import { HashService } from '../hash/hash.service';
import { TokensService } from 'src/tokens/tokens.service';
import { MailService } from '../mail/mail.service';
export declare class UserService {
    private d;
    private v;
    private h;
    private m;
    private tokens;
    constructor(d: DatabaseService, v: ValidatorService, h: HashService, m: MailService, tokens: TokensService);
}
