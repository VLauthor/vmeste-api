import { Response } from 'express';
import { AuthDatabaseService } from 'src/database/auth.service';
import { ResponseInt } from 'src/objects/pesponse.dto';
import { TokensService } from 'src/tokens/tokens.service';
import { HashService } from '../hash/hash.service';
import { MailService } from '../mail/mail.service';
import { ValidatorService } from '../validator/validator.service';
import { checkCodeDto, createCodeDto, loginDto, signInDto, updatePasswordDto } from './auth.dto';
export declare class AuthService {
    private d;
    private v;
    private h;
    private m;
    private tokens;
    constructor(d: AuthDatabaseService, v: ValidatorService, h: HashService, m: MailService, tokens: TokensService);
    loginUser: (res: Response, dto: loginDto) => Promise<any>;
    signInUser: (res: Response, dto: signInDto) => Promise<any>;
    createCode: (res: Response, dto: createCodeDto) => Promise<any>;
    checkCode: (res: Response, dto: checkCodeDto) => Promise<any>;
    updatePassword: (res: Response, dto: updatePasswordDto) => Promise<ResponseInt>;
    test: (res: Response) => Promise<any>;
}
