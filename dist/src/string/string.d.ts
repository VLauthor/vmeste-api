import { DataMessage, monthItem } from 'src/objects/interfaces';
export declare const fields: (field: "nickname" | "mail" | "number") => "никнейм" | "почта" | "номер";
export declare const message: {
    barcode: string;
    qrcode: string;
    reminders: string;
    remindersCreateStepOne: string;
    notLog: string;
    createNameQuiz: string;
    createDescriptionQuiz: string;
    createNameQuestion: string;
    createNameAnswer: string;
    responseNote: string;
};
type messageCode = 'reminders' | 'inpDateReminders' | 'allDataReminders' | 'viewReminfer' | 'createQuiz' | 'createQuestion' | 'createAnswer' | 'sendInputForm' | null;
export declare const messageParams: (message: messageCode, data: DataMessage) => string;
export declare const months: Array<monthItem>;
export {};
