export declare class loginDto {
    login: string;
    password: string;
}
export declare class signinDto {
    last_name: string;
    first_name: string;
    patronomic?: string;
    mail: string;
    nickname: string;
    number?: string;
    gender: boolean;
    date_birthday: string;
    password: string;
    tgKey?: string;
}
export declare class createCodeDto {
    mail: string;
}
export declare class checkCodeDto {
    mail: string;
    code: string;
}
export declare class updatePasswordDto {
    mail: string;
    code: string;
    password: string;
}
export declare class getTelegramLoginDto {
    code: string;
}
export declare class getValidPersonalData {
    nickname: string;
}
export declare class getValid2FA {
    mail: string;
    phone: string;
}
export declare class getUserInfo {
    session: string;
}
