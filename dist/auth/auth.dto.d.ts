export declare class loginDto {
    login: string;
    password: string;
}
export declare class signInDto {
    initials: string;
    nickname: string;
    email: string;
    date: string;
    gender: boolean;
    password: string;
}
export declare class createCodeDto {
    email: string;
}
export declare class checkCodeDto {
    email: string;
    code: string;
}
export declare class updatePasswordDto {
    mail: string;
    code: string;
    password: string;
}
