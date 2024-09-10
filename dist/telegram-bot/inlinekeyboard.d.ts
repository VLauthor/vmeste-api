import { Answers, monthItem, paramsStepMinute, Questions, Quiz, stepCancel, stepHourParams } from 'src/objects/interfaces';
import { InlineKeyboard } from 'grammy';
export declare class InlineKeyboards {
    constructor();
    register(code: string): InlineKeyboard;
    login(code: string): InlineKeyboard;
    reminders(): InlineKeyboard;
    stepButton(step: number, callback?: string): {
        text: string;
        callback_data: string;
    };
    cancelButton(tag: string): {
        text: string;
        callback_data: string;
    };
    margeStepCancel(params: stepCancel): InlineKeyboard;
    keyboardHour(tag: string, thisHour: number, format: 'AM' | 'PM'): InlineKeyboard;
    margeStepHour(params: stepHourParams): InlineKeyboard;
    keyboardDate(tag: string, thisDay: number, thisMonth: monthItem, thisYear: number): InlineKeyboard;
    mergeStepKeyboard(tag: string, step: number, thisDay: number, thisMonth: monthItem, thisYear: number, callback?: string): InlineKeyboard;
    keyboardMinutes(tag: string, thisMinute: number): InlineKeyboard;
    margeStepMinute(params: paramsStepMinute): InlineKeyboard;
    saveButton(tag: string): {
        text: string;
        callback_data: string;
    };
    saveKeyboard(tag: string): InlineKeyboard;
    closeButton(tag: string): {
        text: string;
        callback_data: string;
    };
    keyboardClose(tag: string): InlineKeyboard;
    keyboardDeleteClose(tag: string, id: number): InlineKeyboard;
    boxSlider(tag: string, id: number, settings: {
        view: boolean;
        delete: boolean;
    }): InlineKeyboard;
    boxSliderQuiz(tag: string, id: number): InlineKeyboard;
    buttonRegister(): InlineKeyboard;
    keyboardQuiz(): InlineKeyboard;
    createQuiz(data: Quiz): InlineKeyboard;
    keyboardAddQuestion(data: Questions[]): InlineKeyboard;
    keyboardCreateQuestion(data: Answers[], title: string): InlineKeyboard;
    keyboardCreateAnswer(data: Answers): InlineKeyboard;
}
