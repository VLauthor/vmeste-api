import { QuizDatabaseService } from 'src/database/quizdb.service';
import { CreateQuizDTO } from './dto/request.dto';
export declare class TestService {
    private db;
    constructor(db: QuizDatabaseService);
    CreateQuiz: (data: CreateQuizDTO) => Promise<void>;
}
