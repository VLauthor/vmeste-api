import { signInDto } from 'src/auth/auth.dto';
import { DatabaseResult, objectUser } from 'src/objects/interfaces';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthDatabaseService {
    private p;
    private h;
    constructor(client: PrismaService);
    returnPasswordByMail: (mail: string) => Promise<objectUser>;
    newUser: (data: signInDto) => Promise<DatabaseResult>;
    returnUserIdByMail: (mail: string) => Promise<number>;
    addCodeMail: (userId: number, key: string) => Promise<void>;
    checkCodeUser: (userId: number, code: string) => Promise<Date>;
    updatePassword: (userId: number, password_hash: string) => Promise<void>;
}
