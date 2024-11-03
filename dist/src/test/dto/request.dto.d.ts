export declare class CreateQuizDTO {
    title: string;
    description?: string;
    category: string[];
    difficulty: string;
    limitation: string[];
    time_limit: number;
}
export declare class AddAnswerDTO {
    text: string;
    flag: boolean;
}
export declare class AddQuestionDTO {
    text: string;
    hint?: string;
    type: string;
    score: number;
    answers: AddAnswerDTO[];
}
export declare class AddQuestionsDTO {
    questions: AddQuestionDTO[];
}
