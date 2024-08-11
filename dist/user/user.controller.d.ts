import { UserService } from './user.service';
import { checkCodeDto, createCodeDto, getUserInfo, getValid2FA, getValidPersonalData, loginDto, signinDto, updatePasswordDto } from './dto/user.dto';
export declare class UserController {
    private readonly s;
    constructor(s: UserService);
    getInfo(dto: getUserInfo): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        data: {
            number: string;
            last_name: string;
            first_name: string;
            patronomic: string;
            mail: string;
            nickname: string;
            gender: boolean;
            date_birthday: Date;
        };
    }>;
    getLogin(dto: loginDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    postRegistration(dto: signinDto): Promise<import("../objects/interfaces").Response>;
    getValidPersonal(dto: getValidPersonalData): Promise<import("../objects/interfaces").Response>;
    getValid2FA(dto: getValid2FA): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    postCodeCreate(dto: createCodeDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        data: string;
    }>;
    getCodeCheck(dto: checkCodeDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    updatePassword(dto: updatePasswordDto): Promise<import("../objects/interfaces").Response>;
}
