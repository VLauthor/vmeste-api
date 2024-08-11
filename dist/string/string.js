"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.months = exports.messageParams = exports.message = void 0;
exports.message = {
    barcode: 'Ответь на данное сообщение с текстом для конвертации в штрих-код',
    qrcode: 'Ответь на данное сообщение с текстом для конвертации в qr-код',
    reminders: 'Блок напоминаний, выберите действие из меню ниже',
    remindersCreateStepOne: 'Супер, для создания напоминания нужно заполнить три поля.\nДавайте скорее начнем!\n\nВведите название напоминания...\n\n<i><u>Ваш ответ должен быть "ответом" на данное сообщение</u></i>',
    notLog: 'Вы не авторизированы в нашей системе, это можно сделать в мобильном приложении VMeste',
};
const messageParams = (message, data) => {
    switch (message) {
        case 'reminders':
            return `Блок напоминаний\n\nКол-во ваших напоминаний: ${data.remindersStat.count}\nПредстоящие напоминания: ${data.remindersStat.future}\nЗавершенные напоминания: ${data.remindersStat.past}\n\nВыберите действие из меню ниже`;
            break;
        case 'inpDateReminders':
            return `Введите дату и время напоминания при помощи клавиатуры ниже.\n${data.inpDateReminders.day}.${data.inpDateReminders.month}.${data.inpDateReminders.year} ${data.inpDateReminders.hour}:${data.inpDateReminders.minute}`;
            break;
        case 'allDataReminders':
            const { title, description, date, time } = data.reminder;
            return `<b>Ваша новая заметка:</b>\n\nНазвание: ${title}\nОписание: ${description}\nДата и время: ${date} ${time}`;
            break;
    }
};
exports.messageParams = messageParams;
exports.months = [
    { num: 1, eng: 'January', rus: 'Январь', countDay: 31 },
    { num: 2, eng: 'February', rus: 'Февраль', countDay: 28 },
    { num: 3, eng: 'March', rus: 'Март', countDay: 31 },
    { num: 4, eng: 'April', rus: 'Апрель', countDay: 30 },
    { num: 5, eng: 'May', rus: 'Май', countDay: 31 },
    { num: 6, eng: 'June', rus: 'Июнь', countDay: 30 },
    { num: 7, eng: 'July', rus: 'Июль', countDay: 31 },
    { num: 8, eng: 'August', rus: 'Август', countDay: 31 },
    { num: 9, eng: 'September', rus: 'Сентябрь', countDay: 30 },
    { num: 10, eng: 'October', rus: 'Октябрь', countDay: 31 },
    { num: 11, eng: 'November', rus: 'Ноябрь', countDay: 30 },
    { num: 12, eng: 'December', rus: 'Декабрь', countDay: 31 },
];
//# sourceMappingURL=string.js.map