import { monthItem, paramsStepMinute, stepCancel, stepHourParams } from 'src/objects/interfaces';
import { Markup } from 'telegraf';
export declare class InlineKeyboard {
    constructor();
    register(code: string): Markup.Markup<import("@telegraf/types").InlineKeyboardMarkup>;
    login(code: string): Markup.Markup<import("@telegraf/types").InlineKeyboardMarkup>;
    reminders(): Markup.Markup<import("@telegraf/types").InlineKeyboardMarkup>;
    stepButton(step: number, callback?: string): Markup.Markup<import("@telegraf/types").InlineKeyboardMarkup>;
    cancelButton(tag: string): Markup.Markup<import("@telegraf/types").InlineKeyboardMarkup>;
    margeStepCancel(params: stepCancel): Markup.Markup<import("@telegraf/types").InlineKeyboardMarkup>;
    keyboardHour(tag: string, thisHour: number, format: 'AM' | 'PM'): Markup.Markup<import("@telegraf/types").InlineKeyboardMarkup>;
    margeStepHour(params: stepHourParams): Markup.Markup<import("@telegraf/types").InlineKeyboardMarkup>;
    keyboardDate(tag: string, thisDay: number, thisMonth: monthItem, thisYear: number): Markup.Markup<import("@telegraf/types").InlineKeyboardMarkup>;
    mergeStepKeyboard(tag: string, step: number, thisDay: number, thisMonth: monthItem, thisYear: number, callback?: string): Markup.Markup<import("@telegraf/types").InlineKeyboardMarkup>;
    keyboardMinutes(tag: string, thisMinute: number): Markup.Markup<import("@telegraf/types").InlineKeyboardMarkup>;
    margeStepMinute(params: paramsStepMinute): Markup.Markup<import("@telegraf/types").InlineKeyboardMarkup>;
    saveButton(tag: string): Markup.Markup<import("@telegraf/types").InlineKeyboardMarkup>;
    saveKeyboard(tag: string): Markup.Markup<import("@telegraf/types").InlineKeyboardMarkup>;
    viewButton(tag: string, id: number): Markup.Markup<import("@telegraf/types").InlineKeyboardMarkup>;
    sliderButtons(tag: string): Markup.Markup<import("@telegraf/types").InlineKeyboardMarkup>;
    deleteButton(tag: string, id: number): Markup.Markup<import("@telegraf/types").InlineKeyboardMarkup>;
    boxSlider(tag: string, id: number, settings: {
        view: boolean;
        delete: boolean;
    }): Markup.Markup<import("@telegraf/types").InlineKeyboardMarkup>;
}
