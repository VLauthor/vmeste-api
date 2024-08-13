"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineKeyboards = void 0;
const grammy_1 = require("grammy");
class InlineKeyboards {
    constructor() { }
    register(code) {
        const data = [
            { text: 'Подтвердить', data: `accept_register-${code}` },
            { text: 'Отклонить', data: `disable_register-${code}` },
        ];
        return new grammy_1.InlineKeyboard()
            .text(data[0].text, data[0].data)
            .row()
            .text(data[1].text, data[1].data);
    }
    login(code) {
        const data = [
            { text: 'Подтвердить', data: `accept_login-${code}` },
            { text: 'Отклонить', data: `disable_login-${code}` },
        ];
        return new grammy_1.InlineKeyboard()
            .text(data[0].text, data[0].data)
            .row()
            .text(data[1].text, data[1].data);
    }
    reminders() {
        return new grammy_1.InlineKeyboard()
            .text('Создать', 'create_reminders')
            .row()
            .text('Посмотреть Все', 'open_all_reminders')
            .row()
            .text('Посмотреть Завершенные', 'open_past_reminders')
            .row()
            .text('Посмотреть Предстоящие', 'open_future_reminders')
            .row()
            .text('Посмотреть ближайшие', 'open_last_reminders');
    }
    stepButton(step, callback) {
        if (!callback)
            callback = 'remindersThisStep';
        return { text: `${step}/3`, callback_data: callback };
    }
    cancelButton(tag) {
        return { text: `Отмена`, callback_data: `${tag}-cancel` };
    }
    margeStepCancel(params) {
        const step = this.stepButton(params.step);
        if (!params.boolCancel)
            return new grammy_1.InlineKeyboard().row(step);
        const cancel = this.cancelButton(params.tag);
        return new grammy_1.InlineKeyboard().row(step).row(cancel);
    }
    keyboardHour(tag, thisHour, format) {
        console.log(thisHour, thisHour < 24);
        return new grammy_1.InlineKeyboard()
            .text(thisHour < 24 ? 'Пейти к минутам' : '', `${tag}-kh-next-minute`)
            .row()
            .text('11', `${tag}-kh=11`)
            .text('12', `${tag}-kh=12`)
            .text('01', `${tag}-kh=${checkThisValue(1, thisHour)}`)
            .text('02', `${tag}-kh=${checkThisValue(2, thisHour)}`)
            .row()
            .text('10', `${tag}-kh=${checkThisValue(10, thisHour)}`)
            .text(`AM${format == 'AM' ? ' 📌' : ''}`, `${tag}-kh=AM`)
            .text('03', `${tag}-kh=${checkThisValue(3, thisHour)}`)
            .row()
            .text('09', `${tag}-kh=${checkThisValue(9, thisHour)}`)
            .text(`PM${format == 'PM' ? ' 📌' : ''}`, `${tag}-kh=PM`)
            .text('04', `${tag}-kh=${checkThisValue(4, thisHour)}`)
            .row()
            .text('08', `${tag}-kh=${checkThisValue(8, thisHour)}`)
            .text('07', `${tag}-kh=${checkThisValue(7, thisHour)}`)
            .text('06', `${tag}-kh=${checkThisValue(6, thisHour)}`)
            .text('05', `${tag}-kh=${checkThisValue(5, thisHour)}`);
    }
    margeStepHour(params) {
        const step = this.stepButton(params.step);
        const keyboardHour = this.keyboardHour(params.tag, params.thisHour, params.format);
        const cancel = this.cancelButton(params.tag);
        return keyboardHour.row(step).row(cancel);
    }
    keyboardDate(tag, thisDay, thisMonth, thisYear) {
        return new grammy_1.InlineKeyboard()
            .text(thisDay != 0 ? 'Далее' : '', `${tag}-kd-next-hour`)
            .row()
            .text('<-', `${tag}-bMonth`)
            .text(`${thisMonth.rus}`, `${tag}-inf-month${thisMonth.eng}`)
            .text('->', `${tag}-nMonth`)
            .row()
            .text('1', `${tag}-kd=${checkThisValue(1, thisDay)}`)
            .text('2', `${tag}-kd=${checkThisValue(2, thisDay)}`)
            .text('3', `${tag}-kd=${checkThisValue(3, thisDay)}`)
            .text('4', `${tag}-kd=${checkThisValue(4, thisDay)}`)
            .text('5', `${tag}-kd=${checkThisValue(5, thisDay)}`)
            .text('6', `${tag}-kd=${checkThisValue(6, thisDay)}`)
            .text('7', `${tag}-kd=${checkThisValue(7, thisDay)}`)
            .row()
            .text('8', `${tag}-kd=${checkThisValue(8, thisDay)}`)
            .text('9', `${tag}-kd=${checkThisValue(9, thisDay)}`)
            .text('10', `${tag}-kd=${checkThisValue(10, thisDay)}`)
            .text('11', `${tag}-kd=${checkThisValue(11, thisDay)}`)
            .text('12', `${tag}-kd=${checkThisValue(12, thisDay)}`)
            .text('13', `${tag}-kd=${checkThisValue(13, thisDay)}`)
            .text('14', `${tag}-kd=${checkThisValue(14, thisDay)}`)
            .row()
            .text('15', `${tag}-kd=${checkThisValue(15, thisDay)}`)
            .text('16', `${tag}-kd=${checkThisValue(16, thisDay)}`)
            .text('17', `${tag}-kd=${checkThisValue(17, thisDay)}`)
            .text('18', `${tag}-kd=${checkThisValue(18, thisDay)}`)
            .text('19', `${tag}-kd=${checkThisValue(19, thisDay)}`)
            .text('20', `${tag}-kd=${checkThisValue(20, thisDay)}`)
            .text('21', `${tag}-kd=${checkThisValue(21, thisDay)}`)
            .row()
            .text('22', `${tag}-kd=${checkThisValue(22, thisDay)}`)
            .text('23', `${tag}-kd=${checkThisValue(23, thisDay)}`)
            .text('24', `${tag}-kd=${checkThisValue(24, thisDay)}`)
            .text('25', `${tag}-kd=${checkThisValue(25, thisDay)}`)
            .text('26', `${tag}-kd=${checkThisValue(26, thisDay)}`)
            .text('27', `${tag}-kd=${checkThisValue(27, thisDay)}`)
            .text('28', `${tag}-kd=${checkThisValue(28, thisDay)}`)
            .row()
            .text('29', `${tag}-kd=${checkDay(29, thisMonth.countDay, thisDay)}`)
            .text('30', `${tag}-kd=${checkDay(30, thisMonth.countDay, thisDay)}`)
            .text('31', `${tag}-kd=${checkDay(31, thisMonth.countDay, thisDay)}`)
            .row()
            .text('<-', `${tag}-bYear`)
            .text(`${thisYear}`, `${tag}-inf-year${thisYear}`)
            .text('->', `${tag}-nYear`);
    }
    mergeStepKeyboard(tag, step, thisDay, thisMonth, thisYear, callback) {
        const reminders = this.stepButton(step);
        const keyboard = this.keyboardDate(tag, thisDay, thisMonth, thisYear);
        const cancel = this.cancelButton(tag);
        return keyboard.row(reminders).row(cancel);
    }
    keyboardMinutes(tag, thisMinute) {
        return new grammy_1.InlineKeyboard()
            .text('Сохранить', `${tag}-kmp-save`)
            .row()
            .text('+1', `${tag}-kmp=1`)
            .text('+5', `${tag}-kmp=5`)
            .text('+10', `${tag}-kmp=10`)
            .text('+15', `${tag}-kmp=15`)
            .row()
            .text(`${thisMinute}`, 'plug')
            .row()
            .text('-1', `${tag}-kmm=1`)
            .text('-5', `${tag}-kmm=5`)
            .text('-10', `${tag}-kmm=10`)
            .text('-15', `${tag}-kmm=15`);
    }
    margeStepMinute(params) {
        const cancelButton = this.cancelButton(params.tag);
        const stepButton = this.stepButton(params.step);
        const keyboardMinutes = this.keyboardMinutes(params.tag, params.thisMinute);
        return keyboardMinutes.row(stepButton).row(cancelButton);
    }
    saveButton(tag) {
        return { text: 'Сохранить', callback_data: `${tag}-save` };
    }
    saveKeyboard(tag) {
        const cancel = this.cancelButton(tag);
        const save = this.saveButton(tag);
        return new grammy_1.InlineKeyboard().row(save).row(cancel);
    }
    closeButton(tag) {
        return { text: 'Закрыть', callback_data: `${tag}-close` };
    }
    keyboardClose(tag) {
        return new grammy_1.InlineKeyboard().row(this.closeButton(tag));
    }
    keyboardDeleteClose(tag, id) {
        return new grammy_1.InlineKeyboard()
            .text('Удалить', `${tag}-delete=${id}`)
            .row(this.closeButton(tag));
    }
    boxSlider(tag, id, settings) {
        return new grammy_1.InlineKeyboard()
            .text(settings.view == true ? 'Посмотреть' : '', `${tag}-view=${id}`)
            .row()
            .text('<-', `${tag}-slider-back`)
            .text('->', `${tag}-slider-next`)
            .row()
            .text(settings.delete ? 'Удалить' : '', `${tag}-delete=${id}`)
            .row(this.closeButton(tag));
    }
}
exports.InlineKeyboards = InlineKeyboards;
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