import { Response } from 'express';
import { TestService } from './test.service';
import { AddQuestionsDTO, CreateQuizDTO } from './dto/request.dto';
export declare class TestController {
    private readonly s;
    constructor(s: TestService);
    CreateQuiz(response: Response, dto: CreateQuizDTO): any;
    AddQuestions(response: Response, id: string, dto: AddQuestionsDTO): any;
}
