import { DataMessage, monthItem } from 'src/objects/interfaces';

export const message = {
  barcode: 'Ответь на данное сообщение с текстом для конвертации в штрих-код',
  qrcode: 'Ответь на данное сообщение с текстом для конвертации в qr-код',
  reminders: 'Блок напоминаний, выберите действие из меню ниже',
  remindersCreateStepOne:
    'Супер, для создания напоминания нужно заполнить три поля.\nДавайте скорее начнем!\n\nВведите название напоминания...\n\n<i><u>Ваш ответ должен быть "ответом" на данное сообщение</u></i>',
  notLog:
    'Вы не авторизированы в нашей системе, это можно сделать в мобильном приложении VMeste',
  createNameQuiz: 'Отправьте ответом на данное сообщение название викторины',
  createDescriptionQuiz:
    'Отправьте ответом на данное сообщение описание викторины',
  createNameQuestion: 'Отправьте ответом на данное сообщение текст опроса',
  createNameAnswer: 'Отправьте ответом на данное сообщение текст ответа',
};
type messageCode =
  | 'reminders'
  | 'inpDateReminders'
  | 'allDataReminders'
  | 'viewReminfer'
  | 'createQuiz'
  | 'createQuestion'
  | 'createAnswer'
  | null;
export const messageParams = (message: messageCode, data: DataMessage) => {
  if (message == 'reminders') {
    return `Блок напоминаний\n\nКол-во ваших напоминаний: ${data.remindersStat.count}\nПредстоящие напоминания: ${data.remindersStat.future}\nЗавершенные напоминания: ${data.remindersStat.past}\n\nВыберите действие из меню ниже`;
  } else if (message === 'inpDateReminders') {
    return `Введите дату и время напоминания при помощи клавиатуры ниже.\n${data.inpDateReminders.day}.${data.inpDateReminders.month}.${data.inpDateReminders.year} ${data.inpDateReminders.hour}:${data.inpDateReminders.minute}`;
  } else if (message === 'allDataReminders') {
    const { title, description, date, time } = data.reminder;
    return `<b>Ваша новая заметка:</b>\n\nНазвание: ${title}\nОписание: ${description}\nДата и время: ${date} ${time}`;
  } else if (message === 'createQuiz') {
    const { title, description, mode, key } = data.quiz;
    return `<b>Необходимо заполнить данные ниже:</b>\n\nНазвание: ${title ?? 'Не указано'}\nОписание: ${description ?? 'Не указано'}\nТип викторины: ${mode == 'private' ? 'приватный' : 'публичный'}\n${mode == 'private' ? (key ? 'Ключ: ' + key : 'Ключ: Не указан') : ''}`;
  } else if (message === 'createQuestion') {
    const { title, answers } = data.question;
    let text = `<b>Ваш вопрос:</b>\n\nТекст вопроса: ${title ?? 'Отсутсвует'}\n\nВарианты ответа:\n`;
    for (let i = 0; i < answers.length; i++) {
      text += `${i + 1}) ${answers[i].title}\nОтвет: ${answers[i].correct == true ? 'правильный' : 'не правильный'}\n`;
    }
    text +=
      '<u><i>Чтобы отредактировать вариант ответа, нажмите на кнопку ниже с соответствующим ответом</i></u>';
    return text;
  } else if (message === 'createAnswer') {
    return `<b>Ваш Ответ:</b>\n\nТекст Ответа: ${data.answer.title ? data.answer.title : 'Отсутсвует'}\n\n<u><i>Ниже представлена кнопка с целеным или красным цветом. Она обозначает правильность ответа, чтобы его изменить, нажмите на кнопку</i></u>`;
  }
};
//`<b>Название:</b> ${user.reminders.all[user.slider.thisI].title}\n<b>Описание:</b> ${user.reminders.all[user.slider.thisI].description}\n<b>Дата и время:</b> ${user.reminders.all[user.slider.thisI].date} ${user.reminders.all[user.slider.thisI].time}`
export const months: Array<monthItem> = [
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

// export const yearArray = () => {
//   const date = new Date();
//   const thisYear = date.getFullYear();
//   const arrayYear: Array<number> = [];
//   for (let i = -100; i < 100; i++) {
//     arrayYear.push(thisYear - i);
//   }
//   return arrayYear;
// };
