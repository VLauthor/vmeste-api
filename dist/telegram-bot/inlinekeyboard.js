"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineKeyboard = void 0;
const telegraf_1 = require("telegraf");
class InlineKeyboard {
    constructor() { }
    register(code) {
        const data = [
            { text: 'Подтвердить', data: `accept_register-${code}` },
            { text: 'Отклонить', data: `disable_register-${code}` },
        ];
        return telegraf_1.Markup.inlineKeyboard([
            [
                telegraf_1.Markup.button.callback(data[0].text, data[0].data),
                telegraf_1.Markup.button.callback(data[1].text, data[1].data),
            ],
        ]);
    }
    login(code) {
        const data = [
            { text: 'Подтвердить', data: `accept_login-${code}` },
            { text: 'Отклонить', data: `disable_login-${code}` },
        ];
        return telegraf_1.Markup.inlineKeyboard([
            [
                telegraf_1.Markup.button.callback(data[0].text, data[0].data),
                telegraf_1.Markup.button.callback(data[1].text, data[1].data),
            ],
        ]);
    }
    reminders() {
        return telegraf_1.Markup.inlineKeyboard([
            [telegraf_1.Markup.button.callback('Создать', 'create_reminders')],
            [telegraf_1.Markup.button.callback('Посмотреть Все', 'open_all_reminders')],
            [telegraf_1.Markup.button.callback('Посмотреть Завершенные', 'open_past_reminders')],
            [
                telegraf_1.Markup.button.callback('Посмотреть Предстоящие', 'open_future_reminders'),
            ],
            [telegraf_1.Markup.button.callback('Посмотреть ближайшие', 'open_last/_reminders')],
        ]);
    }
    stepButton(step, callback) {
        if (!callback)
            callback = 'remindersThisStep';
        return telegraf_1.Markup.inlineKeyboard([
            [telegraf_1.Markup.button.callback(`${step}/3`, callback)],
        ]);
    }
    cancelButton(tag) {
        return telegraf_1.Markup.inlineKeyboard([
            [telegraf_1.Markup.button.callback(`Отмена`, `${tag}-cancel`)],
        ]);
    }
    margeStepCancel(params) {
        const step = this.stepButton(params.step);
        if (!params.boolCancel)
            return step;
        const cancel = this.cancelButton(params.tag);
        return telegraf_1.Markup.inlineKeyboard([
            ...step.reply_markup.inline_keyboard,
            ...cancel.reply_markup.inline_keyboard,
        ]);
    }
    keyboardHour(tag, thisHour, format) {
        console.log(thisHour, thisHour < 24);
        return telegraf_1.Markup.inlineKeyboard([
            [
                thisHour < 24
                    ? telegraf_1.Markup.button.callback('Пейти к минутам', `${tag}-kh-next-minute`)
                    : null,
            ].filter((button) => button !== null),
            [
                telegraf_1.Markup.button.callback('11', `${tag}-kh=11`),
                telegraf_1.Markup.button.callback('12', `${tag}-kh=12`),
                telegraf_1.Markup.button.callback('01', `${tag}-kh=${checkThisValue(1, thisHour)}`),
                telegraf_1.Markup.button.callback('02', `${tag}-kh=${checkThisValue(2, thisHour)}`),
            ],
            [
                telegraf_1.Markup.button.callback('10', `${tag}-kh=${checkThisValue(10, thisHour)}`),
                telegraf_1.Markup.button.callback(`AM${format == 'AM' ? ' 📌' : ''}`, `${tag}-kh=AM`),
                telegraf_1.Markup.button.callback('03', `${tag}-kh=${checkThisValue(3, thisHour)}`),
            ],
            [
                telegraf_1.Markup.button.callback('09', `${tag}-kh=${checkThisValue(9, thisHour)}`),
                telegraf_1.Markup.button.callback(`PM${format == 'PM' ? ' 📌' : ''}`, `${tag}-kh=PM`),
                telegraf_1.Markup.button.callback('04', `${tag}-kh=${checkThisValue(4, thisHour)}`),
            ],
            [
                telegraf_1.Markup.button.callback('08', `${tag}-kh=${checkThisValue(8, thisHour)}`),
                telegraf_1.Markup.button.callback('07', `${tag}-kh=${checkThisValue(7, thisHour)}`),
                telegraf_1.Markup.button.callback('06', `${tag}-kh=${checkThisValue(6, thisHour)}`),
                telegraf_1.Markup.button.callback('05', `${tag}-kh=${checkThisValue(5, thisHour)}`),
            ],
        ]);
    }
    margeStepHour(params) {
        const step = this.stepButton(params.step);
        const keyboardHour = this.keyboardHour(params.tag, params.thisHour, params.format);
        const cancel = this.cancelButton(params.tag);
        return telegraf_1.Markup.inlineKeyboard([
            ...step.reply_markup.inline_keyboard,
            ...keyboardHour.reply_markup.inline_keyboard,
            ...cancel.reply_markup.inline_keyboard,
        ]);
    }
    keyboardDate(tag, thisDay, thisMonth, thisYear) {
        return telegraf_1.Markup.inlineKeyboard([
            [
                thisDay != 0
                    ? telegraf_1.Markup.button.callback('Далее', `${tag}-kd-next-hour`)
                    : null,
            ].filter((button) => button !== null),
            [
                telegraf_1.Markup.button.callback('<-', `${tag}-bMonth`),
                telegraf_1.Markup.button.callback(`${thisMonth.rus}`, `${tag}-inf-month${thisMonth.eng}`),
                telegraf_1.Markup.button.callback('->', `${tag}-nMonth`),
            ],
            [
                telegraf_1.Markup.button.callback('1', `${tag}-kd=${checkThisValue(1, thisDay)}`),
                telegraf_1.Markup.button.callback('2', `${tag}-kd=${checkThisValue(2, thisDay)}`),
                telegraf_1.Markup.button.callback('3', `${tag}-kd=${checkThisValue(3, thisDay)}`),
                telegraf_1.Markup.button.callback('4', `${tag}-kd=${checkThisValue(4, thisDay)}`),
                telegraf_1.Markup.button.callback('5', `${tag}-kd=${checkThisValue(5, thisDay)}`),
                telegraf_1.Markup.button.callback('6', `${tag}-kd=${checkThisValue(6, thisDay)}`),
                telegraf_1.Markup.button.callback('7', `${tag}-kd=${checkThisValue(7, thisDay)}`),
            ],
            [
                telegraf_1.Markup.button.callback('8', `${tag}-kd=${checkThisValue(8, thisDay)}`),
                telegraf_1.Markup.button.callback('9', `${tag}-kd=${checkThisValue(9, thisDay)}`),
                telegraf_1.Markup.button.callback('10', `${tag}-kd=${checkThisValue(10, thisDay)}`),
                telegraf_1.Markup.button.callback('11', `${tag}-kd=${checkThisValue(11, thisDay)}`),
                telegraf_1.Markup.button.callback('12', `${tag}-kd=${checkThisValue(12, thisDay)}`),
                telegraf_1.Markup.button.callback('13', `${tag}-kd=${checkThisValue(13, thisDay)}`),
                telegraf_1.Markup.button.callback('14', `${tag}-kd=${checkThisValue(14, thisDay)}`),
            ],
            [
                telegraf_1.Markup.button.callback('15', `${tag}-kd=${checkThisValue(15, thisDay)}`),
                telegraf_1.Markup.button.callback('16', `${tag}-kd=${checkThisValue(16, thisDay)}`),
                telegraf_1.Markup.button.callback('17', `${tag}-kd=${checkThisValue(17, thisDay)}`),
                telegraf_1.Markup.button.callback('18', `${tag}-kd=${checkThisValue(18, thisDay)}`),
                telegraf_1.Markup.button.callback('19', `${tag}-kd=${checkThisValue(19, thisDay)}`),
                telegraf_1.Markup.button.callback('20', `${tag}-kd=${checkThisValue(20, thisDay)}`),
                telegraf_1.Markup.button.callback('21', `${tag}-kd=${checkThisValue(21, thisDay)}`),
            ],
            [
                telegraf_1.Markup.button.callback('22', `${tag}-kd=${checkThisValue(22, thisDay)}`),
                telegraf_1.Markup.button.callback('23', `${tag}-kd=${checkThisValue(23, thisDay)}`),
                telegraf_1.Markup.button.callback('24', `${tag}-kd=${checkThisValue(24, thisDay)}`),
                telegraf_1.Markup.button.callback('25', `${tag}-kd=${checkThisValue(25, thisDay)}`),
                telegraf_1.Markup.button.callback('26', `${tag}-kd=${checkThisValue(26, thisDay)}`),
                telegraf_1.Markup.button.callback('27', `${tag}-kd=${checkThisValue(27, thisDay)}`),
                telegraf_1.Markup.button.callback('28', `${tag}-kd=${checkThisValue(28, thisDay)}`),
            ],
            [
                telegraf_1.Markup.button.callback('29', `${tag}-kd=${checkDay(29, thisMonth.countDay, thisDay)}`),
                telegraf_1.Markup.button.callback('30', `${tag}-kd=${checkDay(30, thisMonth.countDay, thisDay)}`),
                telegraf_1.Markup.button.callback('31', `${tag}-kd=${checkDay(31, thisMonth.countDay, thisDay)}`),
            ],
            [
                telegraf_1.Markup.button.callback('<-', `${tag}-bYear`),
                telegraf_1.Markup.button.callback(`${thisYear}`, `${tag}-inf-year${thisYear}`),
                telegraf_1.Markup.button.callback('->', `${tag}-nYear`),
            ],
        ]);
    }
    mergeStepKeyboard(tag, step, thisDay, thisMonth, thisYear, callback) {
        const reminders = this.stepButton(step);
        const keyboard = this.keyboardDate(tag, thisDay, thisMonth, thisYear);
        const cancel = this.cancelButton(tag);
        const merge = [
            ...reminders.reply_markup.inline_keyboard,
            ...keyboard.reply_markup.inline_keyboard,
            ...cancel.reply_markup.inline_keyboard,
        ];
        return telegraf_1.Markup.inlineKeyboard(merge);
    }
    keyboardMinutes(tag, thisMinute) {
        return telegraf_1.Markup.inlineKeyboard([
            [callback('Сохранить', `${tag}-kmp-save`)],
            [
                callback('+1', `${tag}-kmp=1`),
                callback('+5', `${tag}-kmp=5`),
                callback('+10', `${tag}-kmp=10`),
                callback('+15', `${tag}-kmp=15`),
            ],
            [callback(`${thisMinute}`, 'plug')],
            [
                callback('-1', `${tag}-kmm=1`),
                callback('-5', `${tag}-kmm=5`),
                callback('-10', `${tag}-kmm=10`),
                callback('-15', `${tag}-kmm=15`),
            ],
        ]);
    }
    margeStepMinute(params) {
        const cancelButton = this.cancelButton(params.tag);
        const stepButton = this.stepButton(params.step);
        const keyboardMinutes = this.keyboardMinutes(params.tag, params.thisMinute);
        return telegraf_1.Markup.inlineKeyboard([
            ...stepButton.reply_markup.inline_keyboard,
            ...keyboardMinutes.reply_markup.inline_keyboard,
            ...cancelButton.reply_markup.inline_keyboard,
        ]);
    }
    saveButton(tag) {
        return telegraf_1.Markup.inlineKeyboard([callback('Сохранить', `${tag}-save`)]);
    }
    saveKeyboard(tag) {
        const cancel = this.cancelButton(tag);
        const save = this.saveButton(tag);
        return telegraf_1.Markup.inlineKeyboard([
            ...save.reply_markup.inline_keyboard,
            ...cancel.reply_markup.inline_keyboard,
        ]);
    }
    viewButton(tag, id) {
        return telegraf_1.Markup.inlineKeyboard([
            [callback('Посмотреть', `${tag}-view=${id}`)],
        ]);
    }
    sliderButtons(tag) {
        return telegraf_1.Markup.inlineKeyboard([
            [
                callback('<-', `${tag}-slider-back`),
                callback('->', `${tag}-slider-next`),
            ],
        ]);
    }
    deleteButton(tag, id) {
        return telegraf_1.Markup.inlineKeyboard([
            [callback('Удалить', `${tag}-delete=${id}`)],
        ]);
    }
    boxSlider(tag, id, settings) {
        const buttons = [];
        if (settings.view) {
            const viewButton = this.viewButton(tag, id);
            buttons.push(...viewButton.reply_markup.inline_keyboard);
        }
        const sliderButtons = this.sliderButtons(tag);
        buttons.push(...sliderButtons.reply_markup.inline_keyboard);
        if (settings.delete) {
            const deleteButton = this.deleteButton(tag, id);
            buttons.push(...deleteButton.reply_markup.inline_keyboard);
        }
        return telegraf_1.Markup.inlineKeyboard(buttons);
    }
}
exports.InlineKeyboard = InlineKeyboard;
function callback(text, callback) {
    return telegraf_1.Markup.button.callback(text, callback);
}
function checkDay(item, maxDay, thisDay) {
    if (maxDay >= item) {
        if (item == thisDay) {
            return true;
        }
        else
            return item;
    }
    else
        return false;
}
function checkThisValue(item, thisValue) {
    if (item == thisValue) {
        return true;
    }
    else
        return item;
}
//# sourceMappingURL=inlinekeyboard.js.map