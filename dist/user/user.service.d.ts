import { HttpStatus } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Response } from '../objects/interfaces';
import { ValidatorService } from '../validator/validator.service';
import { HashService } from '../hash/hash.service';
import { checkCodeDto, createCodeDto, getValid2FA, getValidPersonalData, signinDto, updatePasswordDto } from './dto/user.dto';
import { MailService } from '../mail/mail.service';
export declare class UserService {
    private d;
    private v;
    private h;
    private m;
    constructor(d: DatabaseService, v: ValidatorService, h: HashService, m: MailService);
    loginUser: (login: string, password: string) => Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    signInUser: (user: signinDto) => Promise<Response>;
    createCode: (dto: createCodeDto) => Promise<{
        statusCode: HttpStatus;
        data: string;
    }>;
    checkCode: (dto: checkCodeDto) => Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    updatePassword: (dto: updatePasswordDto) => Promise<Response>;
    validPersonalDate: (dto: getValidPersonalData) => Promise<Response>;
    valid2FA: (dto: getValid2FA) => Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    getUserInfo: (session: string) => Promise<{
        statusCode: HttpStatus;
        data: {
            number: string;
            nickname: string;
            mail: string;
            last_name: string;
            first_name: string;
            patronomic: string;
            gender: boolean;
            date_birthday: Date;
        };
    }>;
}
