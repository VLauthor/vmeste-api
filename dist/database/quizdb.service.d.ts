import { PrismaService } from '../prisma/prisma.service';
export declare class QuizDatabaseService {
    private p;
    private h;
    constructor(client: PrismaService);
    CreateQuiz: (authorID: number, data: any) => Promise<void>;
}
