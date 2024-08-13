import { DataMessage, monthItem } from 'src/objects/interfaces';
export declare const message: {
    barcode: string;
    qrcode: string;
    reminders: string;
    remindersCreateStepOne: string;
    notLog: string;
};
type messageCode = 'reminders' | 'inpDateReminders' | 'allDataReminders' | 'viewReminfer' | null;
export declare const messageParams: (message: messageCode, data: DataMessage) => string;
export declare const months: Array<monthItem>;
export {};
