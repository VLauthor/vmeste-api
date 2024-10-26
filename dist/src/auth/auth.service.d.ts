import { DatabaseService } from '../database/database.service';
import { ResponseInt } from '../objects/interfaces';
import { ValidatorService } from '../validator/validator.service';
import { HashService } from '../hash/hash.service';
import { TokensService } from 'src/tokens/tokens.service';
import { Response } from 'express';
import { checkCodeDto, createCodeDto, loginDto, signInDto, updatePasswordDto } from './auth.dto';
import { MailService } from '../mail/mail.service';
export declare class AuthService {
    private d;
    private v;
    private h;
    private m;
    private tokens;
    constructor(d: DatabaseService, v: ValidatorService, h: HashService, m: MailService, tokens: TokensService);
    loginUser: (res: Response, dto: loginDto) => Promise<any>;
    signInUser: (res: Response, dto: signInDto) => Promise<any>;
    createCode: (res: Response, dto: createCodeDto) => Promise<any>;
    checkCode: (res: Response, dto: checkCodeDto) => Promise<any>;
    updatePassword: (res: Response, dto: updatePasswordDto) => Promise<ResponseInt>;
}
