import {
  monthItem,
  paramsStepMinute,
  stepCancel,
  stepHourParams,
} from 'src/objects/interfaces';
import { Markup } from 'telegraf';
export class InlineKeyboard {
  constructor() {}
  register(code: string) {
    const data = [
      { text: 'Подтвердить', data: `accept_register-${code}` },
      { text: 'Отклонить', data: `disable_register-${code}` },
    ];
    return Markup.inlineKeyboard([
      [
        Markup.button.callback(data[0].text, data[0].data),
        Markup.button.callback(data[1].text, data[1].data),
      ],
    ]);
  }
  login(code: string) {
    const data = [
      { text: 'Подтвердить', data: `accept_login-${code}` },
      { text: 'Отклонить', data: `disable_login-${code}` },
    ];
    return Markup.inlineKeyboard([
      [
        Markup.button.callback(data[0].text, data[0].data),
        Markup.button.callback(data[1].text, data[1].data),
      ],
    ]);
  }
  reminders() {
    return Markup.inlineKeyboard([
      [Markup.button.callback('Создать', 'create_reminders')],
      [Markup.button.callback('Посмотреть Все', 'open_all_reminders')],
      [Markup.button.callback('Посмотреть Завершенные', 'open_past_reminders')],
      [
        Markup.button.callback(
          'Посмотреть Предстоящие',
          'open_future_reminders',
        ),
      ],
      [Markup.button.callback('Посмотреть ближайшие', 'open_last/_reminders')],
    ]);
  }
  stepButton(step: number, callback?: string) {
    if (!callback) callback = 'remindersThisStep';
    return Markup.inlineKeyboard([
      [Markup.button.callback(`${step}/3`, callback)],
    ]);
  }
  cancelButton(tag: string) {
    return Markup.inlineKeyboard([
      [Markup.button.callback(`Отмена`, `${tag}-cancel`)],
    ]);
  }
  margeStepCancel(params: stepCancel) {
    // return Markup.inlineKeyboard()
    const step = this.stepButton(params.step);
    if (!params.boolCancel) return step;
    const cancel = this.cancelButton(params.tag);
    return Markup.inlineKeyboard([
      ...step.reply_markup.inline_keyboard,
      ...cancel.reply_markup.inline_keyboard,
    ]);
  }
  keyboardHour(tag: string, thisHour: number, format: 'AM' | 'PM') {
    console.log(thisHour, thisHour < 24);
    return Markup.inlineKeyboard([
      [
        thisHour < 24
          ? Markup.button.callback('Пейти к минутам', `${tag}-kh-next-minute`)
          : null,
      ].filter((button) => button !== null),
      [
        Markup.button.callback('11', `${tag}-kh=11`),
        Markup.button.callback('12', `${tag}-kh=12`),
        Markup.button.callback(
          '01',
          `${tag}-kh=${checkThisValue(1, thisHour)}`,
        ),
        Markup.button.callback(
          '02',
          `${tag}-kh=${checkThisValue(2, thisHour)}`,
        ),
      ],
      [
        Markup.button.callback(
          '10',
          `${tag}-kh=${checkThisValue(10, thisHour)}`,
        ),

        Markup.button.callback(
          `AM${format == 'AM' ? ' 📌' : ''}`,
          `${tag}-kh=AM`,
        ),
        Markup.button.callback(
          '03',
          `${tag}-kh=${checkThisValue(3, thisHour)}`,
        ),
      ],
      [
        Markup.button.callback(
          '09',
          `${tag}-kh=${checkThisValue(9, thisHour)}`,
        ),
        Markup.button.callback(
          `PM${format == 'PM' ? ' 📌' : ''}`,
          `${tag}-kh=PM`,
        ),
        Markup.button.callback(
          '04',
          `${tag}-kh=${checkThisValue(4, thisHour)}`,
        ),
      ],
      [
        Markup.button.callback(
          '08',
          `${tag}-kh=${checkThisValue(8, thisHour)}`,
        ),
        Markup.button.callback(
          '07',
          `${tag}-kh=${checkThisValue(7, thisHour)}`,
        ),
        Markup.button.callback(
          '06',
          `${tag}-kh=${checkThisValue(6, thisHour)}`,
        ),
        Markup.button.callback(
          '05',
          `${tag}-kh=${checkThisValue(5, thisHour)}`,
        ),
      ],
    ]);
  }
  margeStepHour(params: stepHourParams) {
    const step = this.stepButton(params.step);
    const keyboardHour = this.keyboardHour(
      params.tag,
      params.thisHour,
      params.format,
    );
    const cancel = this.cancelButton(params.tag);
    return Markup.inlineKeyboard([
      ...step.reply_markup.inline_keyboard,
      ...keyboardHour.reply_markup.inline_keyboard,
      ...cancel.reply_markup.inline_keyboard,
    ]);
  }
  keyboardDate(
    tag: string,
    thisDay: number,
    thisMonth: monthItem,
    thisYear: number,
  ) {
    return Markup.inlineKeyboard([
      [
        thisDay != 0
          ? Markup.button.callback('Далее', `${tag}-kd-next-hour`)
          : null,
      ].filter((button) => button !== null),
      [
        Markup.button.callback('<-', `${tag}-bMonth`),
        Markup.button.callback(
          `${thisMonth.rus}`,
          `${tag}-inf-month${thisMonth.eng}`,
        ),
        Markup.button.callback('->', `${tag}-nMonth`),
      ],
      [
        Markup.button.callback('1', `${tag}-kd=${checkThisValue(1, thisDay)}`),
        Markup.button.callback('2', `${tag}-kd=${checkThisValue(2, thisDay)}`),
        Markup.button.callback('3', `${tag}-kd=${checkThisValue(3, thisDay)}`),
        Markup.button.callback('4', `${tag}-kd=${checkThisValue(4, thisDay)}`),
        Markup.button.callback('5', `${tag}-kd=${checkThisValue(5, thisDay)}`),
        Markup.button.callback('6', `${tag}-kd=${checkThisValue(6, thisDay)}`),
        Markup.button.callback('7', `${tag}-kd=${checkThisValue(7, thisDay)}`),
      ],
      [
        Markup.button.callback('8', `${tag}-kd=${checkThisValue(8, thisDay)}`),
        Markup.button.callback('9', `${tag}-kd=${checkThisValue(9, thisDay)}`),
        Markup.button.callback(
          '10',
          `${tag}-kd=${checkThisValue(10, thisDay)}`,
        ),
        Markup.button.callback(
          '11',
          `${tag}-kd=${checkThisValue(11, thisDay)}`,
        ),
        Markup.button.callback(
          '12',
          `${tag}-kd=${checkThisValue(12, thisDay)}`,
        ),
        Markup.button.callback(
          '13',
          `${tag}-kd=${checkThisValue(13, thisDay)}`,
        ),
        Markup.button.callback(
          '14',
          `${tag}-kd=${checkThisValue(14, thisDay)}`,
        ),
      ],
      [
        Markup.button.callback(
          '15',
          `${tag}-kd=${checkThisValue(15, thisDay)}`,
        ),
        Markup.button.callback(
          '16',
          `${tag}-kd=${checkThisValue(16, thisDay)}`,
        ),
        Markup.button.callback(
          '17',
          `${tag}-kd=${checkThisValue(17, thisDay)}`,
        ),
        Markup.button.callback(
          '18',
          `${tag}-kd=${checkThisValue(18, thisDay)}`,
        ),
        Markup.button.callback(
          '19',
          `${tag}-kd=${checkThisValue(19, thisDay)}`,
        ),
        Markup.button.callback(
          '20',
          `${tag}-kd=${checkThisValue(20, thisDay)}`,
        ),
        Markup.button.callback(
          '21',
          `${tag}-kd=${checkThisValue(21, thisDay)}`,
        ),
      ],
      [
        Markup.button.callback(
          '22',
          `${tag}-kd=${checkThisValue(22, thisDay)}`,
        ),
        Markup.button.callback(
          '23',
          `${tag}-kd=${checkThisValue(23, thisDay)}`,
        ),
        Markup.button.callback(
          '24',
          `${tag}-kd=${checkThisValue(24, thisDay)}`,
        ),
        Markup.button.callback(
          '25',
          `${tag}-kd=${checkThisValue(25, thisDay)}`,
        ),
        Markup.button.callback(
          '26',
          `${tag}-kd=${checkThisValue(26, thisDay)}`,
        ),
        Markup.button.callback(
          '27',
          `${tag}-kd=${checkThisValue(27, thisDay)}`,
        ),
        Markup.button.callback(
          '28',
          `${tag}-kd=${checkThisValue(28, thisDay)}`,
        ),
      ],
      [
        Markup.button.callback(
          '29',
          `${tag}-kd=${checkDay(29, thisMonth.countDay, thisDay)}`,
        ),
        Markup.button.callback(
          '30',
          `${tag}-kd=${checkDay(30, thisMonth.countDay, thisDay)}`,
        ),
        Markup.button.callback(
          '31',
          `${tag}-kd=${checkDay(31, thisMonth.countDay, thisDay)}`,
        ),
      ],
      [
        Markup.button.callback('<-', `${tag}-bYear`),
        Markup.button.callback(`${thisYear}`, `${tag}-inf-year${thisYear}`),
        Markup.button.callback('->', `${tag}-nYear`),
      ],
    ]);
  }
  mergeStepKeyboard(
    tag: string,
    step: number,
    thisDay: number,
    thisMonth: monthItem,
    thisYear: number,
    callback?: string,
  ) {
    const reminders = this.stepButton(step);
    const keyboard = this.keyboardDate(tag, thisDay, thisMonth, thisYear);
    const cancel = this.cancelButton(tag);
    const merge = [
      ...reminders.reply_markup.inline_keyboard,
      ...keyboard.reply_markup.inline_keyboard,
      ...cancel.reply_markup.inline_keyboard,
    ];
    return Markup.inlineKeyboard(merge);
  }
  keyboardMinutes(tag: string, thisMinute: number) {
    return Markup.inlineKeyboard([
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
  margeStepMinute(params: paramsStepMinute) {
    const cancelButton = this.cancelButton(params.tag);
    const stepButton = this.stepButton(params.step);
    const keyboardMinutes = this.keyboardMinutes(params.tag, params.thisMinute);
    return Markup.inlineKeyboard([
      ...stepButton.reply_markup.inline_keyboard,
      ...keyboardMinutes.reply_markup.inline_keyboard,
      ...cancelButton.reply_markup.inline_keyboard,
    ]);
  }
  saveButton(tag: string) {
    return Markup.inlineKeyboard([callback('Сохранить', `${tag}-save`)]);
  }
  saveKeyboard(tag: string) {
    const cancel = this.cancelButton(tag);
    const save = this.saveButton(tag);
    return Markup.inlineKeyboard([
      ...save.reply_markup.inline_keyboard,
      ...cancel.reply_markup.inline_keyboard,
    ]);
  }
  viewButton(tag: string, id: number) {
    return Markup.inlineKeyboard([
      [callback('Посмотреть', `${tag}-view=${id}`)],
    ]);
  }
  sliderButtons(tag: string) {
    return Markup.inlineKeyboard([
      [
        callback('<-', `${tag}-slider-back`),
        callback('->', `${tag}-slider-next`),
      ],
    ]);
  }
  deleteButton(tag: string, id: number) {
    return Markup.inlineKeyboard([
      [callback('Удалить', `${tag}-delete=${id}`)],
    ]);
  }
  boxSlider(
    tag: string,
    id: number,
    settings: { view: boolean; delete: boolean },
  ) {
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
    return Markup.inlineKeyboard(buttons);
  }
}

function callback(text: string, callback: string) {
  return Markup.button.callback(text, callback);
}

function checkDay(item, maxDay, thisDay) {
  if (maxDay >= item) {
    if (item == thisDay) {
      return true;
    } else return item;
  } else return false;
}

function checkThisValue(item: number, thisValue: number) {
  if (item == thisValue) {
    return true;
  } else return item;
}
