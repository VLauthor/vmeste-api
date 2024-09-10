"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registration = void 0;
const grammy_1 = require("grammy");
const menu_1 = require("@grammyjs/menu");
const string_1 = require("../../string/string");
const validator_1 = require("validator");
const class_1 = require("../../objects/class");
const common_1 = require("@nestjs/common");
const reg = new grammy_1.Composer();
let cache;
let ik;
let db;
let valid;
let hash;
class Registration {
    constructor(c, ink, dbs, validator, hashImport) {
        this.c = c;
        this.ink = ink;
        this.dbs = dbs;
        this.validator = validator;
        this.hashImport = hashImport;
        this.hasEditMess = (id) => {
            if (!this.editMess.has(id))
                return false;
            if (!this.editMess.get(id).has('userForm'))
                return false;
            return this.editMess.get(id).get('userForm');
        };
        this.answer = async (ctx, answer) => {
            ctx.answerCallbackQuery({
                text: answer,
                show_alert: false,
                cache_time: 10,
            });
        };
        this.checkParam = async (param) => {
            if (param !== null)
                return param + ' 🍏';
            return 'Не указано 🍎';
        };
        this.returnFio = (f, i, o) => {
            let fio = `${f}`;
            if (i !== null)
                fio = fio + ` ${i}`;
            if (o !== null)
                fio = fio + ` ${o}`;
            if (fio.split(' ').length === 3 || fio.split(' ').length === 2)
                return fio + ' 🍏';
            return fio + ' (заполнено не полностью) 🍎';
        };
        this.sendInputForm = async (ctx, title, format) => {
            if (!this.checkHashForm(ctx))
                return;
            const mainText = (0, string_1.messageParams)('sendInputForm', {
                formParams: { title: title, format: format },
            }) + string_1.message.responseNote;
            const mess = await ctx.reply(mainText, {
                reply_markup: ik.keyboardClose('reg'),
                parse_mode: 'HTML',
            });
            this.addListMessage(ctx.from.id, mess.message_id, {
                code: title,
                status: 'expect',
                time: 30000,
                ctx: ctx,
            });
        };
        this.switchGender = async (ctx) => {
            if (!this.checkHashForm(ctx))
                return;
            const form = this.userForm.get(ctx.from.id);
            form.gender = !form.gender;
            const menu = this.returnMenu();
            this.editForm(ctx, ctx.callbackQuery.message.message_id, form, menu);
        };
        this.log = (text) => {
            console.log(text);
        };
        this.checkHashForm = (ctx) => {
            if (this.userForm.has(ctx.from.id))
                return true;
            ctx.deleteMessage();
            ctx.reply('К сожалению Ваши данные были потеряны, пожалуйста повторите попытку.', {
                reply_markup: ik.buttonRegister(),
            });
            return false;
        };
        this.addListMessage = (id, key, mess) => {
            if (!this.reactionMess.has(id)) {
                this.reactionMess.set(id, new Map());
            }
            this.reactionMess.get(id)?.set(key, mess);
        };
        this.hasListMessage = (id, key) => {
            return this.reactionMess.get(id)?.has(key);
        };
        this.getListMessage = (id, key) => {
            return this.reactionMess.get(id)?.get(key);
        };
        this.editStatusListMessage = (id, key, bool) => {
            const item = this.reactionMess.get(id).get(key);
            item.status = bool;
        };
        this.deleteListMessage = (id, key) => {
            if (!this.reactionMess.has(id))
                return;
            this.reactionMess.get(id)?.delete(key);
        };
        this.returnMenu = () => {
            return new menu_1.Menu('regis-menu')
                .text('Сохранить', async (ctx) => {
                const form = this.userForm.get(ctx.from.id);
                const { last_name, first_name, gender, patronomic, mail, date, nickname, password_hash, } = form;
                if (last_name === null ||
                    first_name === null ||
                    gender === null ||
                    mail === null ||
                    date === null ||
                    nickname === null ||
                    password_hash === null) {
                    return this.sendWarning(ctx, 'Вы заполнили не все данные', 3);
                }
                const passwordHash = await hash.createHash(password_hash);
                date.month++;
                const formater = new class_1.formatDate(date);
                const resultAddUser = await db.newUser({
                    last_name: last_name,
                    first_name: first_name,
                    patronomic: patronomic ? patronomic : '',
                    mail: mail,
                    nickname: nickname,
                    gender: gender,
                    date_birthday: formater.returnDBDate(),
                    password: passwordHash,
                });
                if (resultAddUser.statusCode != common_1.HttpStatus.CREATED) {
                    console.log(resultAddUser);
                    if (resultAddUser.statusCode === common_1.HttpStatus.CONFLICT) {
                        let text = 'Ошибка создания пользователя.\nДанные следующих полей уже зарегистрированы:';
                        for (const item of resultAddUser.description.fields)
                            text += ` ${(0, string_1.fields)(item)}`;
                        return this.sendWarning(ctx, text, 10);
                    }
                    return this.sendWarning(ctx, 'Ошибка создания пользователя', 3);
                }
                else {
                }
            })
                .row()
                .text('Фамилия Имя Отчество', (ctx) => this.sendInputForm(ctx, 'ФИО', 'Фамилия Имя Отчество'))
                .row()
                .text('Почта', (ctx) => this.sendInputForm(ctx, 'почта', 'name@mail.com'))
                .text('Никнейм', (ctx) => this.sendInputForm(ctx, 'никнейм', 'никнейм должен быть больше 3 символов'))
                .row()
                .text('Дата рождения', (ctx) => this.sendCalendar(ctx))
                .row()
                .text('Пол', (ctx) => this.switchGender(ctx))
                .text('Пароль', (ctx) => this.sendInputForm(ctx, 'пароль', 'от 6 символов, должен включать цифры, заглавные и строчные буквы, а также символы'))
                .row()
                .text('Закрыть форму', (ctx) => ctx.deleteMessage())
                .row();
        };
        this.sendCalendar = async (ctx) => {
            if (!this.checkHashForm(ctx))
                return;
            const form = this.userForm.get(ctx.from.id);
            const date = form.date;
            let monthData;
            if (date.year === null) {
                const currentDate = new Date();
                date.year = currentDate.getFullYear() - 16;
                monthData = string_1.months[currentDate.getMonth()];
            }
            else {
                monthData = string_1.months[date.month];
            }
            const formDate = new class_1.formatDate({
                day: date.day,
                year: date.year,
                month: monthData.num,
            });
            ctx.reply(`Дата вашего рождения: ${formDate.returnViewDate()}\nДля ввода даты воспользуйтесь клавиатурой ниже`, {
                reply_markup: ik.keyboardDate('registaration', date.day, monthData, date.year),
            });
        };
        this.editCalendar = async (ctx) => {
            if (!this.checkHashForm(ctx))
                return;
            const form = this.userForm.get(ctx.from.id);
            const date = form.date;
            let monthData;
            if (date.year === null) {
                const currentDate = new Date();
                date.year = currentDate.getFullYear() - 16;
                monthData = string_1.months[currentDate.getMonth()];
            }
            else {
                monthData = string_1.months[date.month];
            }
            const formDate = new class_1.formatDate({
                day: date.day,
                year: date.year,
                month: monthData.num,
            });
            ctx.editMessageText(`Дата вашего рождения: ${formDate.returnViewDate()}\nДля ввода даты воспользуйтесь клавиатурой ниже`, {
                reply_markup: ik.keyboardDate('registaration', date.day, monthData, date.year),
            });
        };
        this.Intervals = () => {
            setInterval(async () => {
                this.reactionMess.forEach((valueUser, keyUser) => {
                    valueUser.forEach((valueItem, keyItem) => {
                        if (valueItem.time < 0 ||
                            valueItem.status === true ||
                            valueItem.status === false) {
                            this.deleteListMessage(keyUser, keyItem);
                            valueItem.ctx.api.deleteMessage(keyUser, keyItem);
                            return;
                        }
                        const item = this.reactionMess.get(keyUser).get(keyItem);
                        item.time -= 5000;
                    });
                });
            }, 5000);
        };
        this.sendForm = async (ctx, form, menu) => {
            const { year, month, day } = form.date;
            let fulldate;
            const formDate = new class_1.formatDate({ year: year, month: month, day: day });
            if (formDate.checkCorrectDate()) {
                fulldate = formDate.returnViewDate() + ' 🍏';
            }
            else {
                fulldate = formDate.returnViewDate() + ' 🍎';
            }
            const mess = await ctx.reply(`<b>Ваша форма для регистрации:</b>\n\nФИО: ${this.returnFio(form.last_name, form.first_name, form.patronomic)}\nДата рождения: ${fulldate}\nПочта: ${await this.checkParam(form.mail)}\nНикнейм:  ${await this.checkParam(form.nickname)}\nПол: ${form.gender ? 'Мужской 🍏' : 'Женский 🍏'}\nПароль:  ${await this.checkParam(form.password_hash)}\n\n<i>🍏 - обозначает что поле заполненно\n🍎 - обозначает что поле не заполнено</i>\n\n<i>Для изменения полей выберите интересующий Вас параметр ниже</i>`, { reply_markup: menu, parse_mode: 'HTML' });
            this.editMess.get(ctx.from.id).set('userForm', mess.message_id);
        };
        this.editForm = async (ctx, messId, form, menu) => {
            const { year, month, day } = form.date;
            let fulldate;
            const formDate = new class_1.formatDate({ year: year, month: month, day: day });
            if (formDate.checkCorrectDate()) {
                fulldate = formDate.returnViewDate() + ' 🍏';
            }
            else {
                fulldate = formDate.returnViewDate() + ' 🍎';
            }
            ctx.api
                .editMessageText(ctx.from.id, messId, `<b>Ваша форма для регистрации:</b>\n\nФИО: ${this.returnFio(form.last_name, form.first_name, form.patronomic)}\nДата рождения: ${fulldate}\nПочта: ${await this.checkParam(form.mail)}\nНикнейм:  ${await this.checkParam(form.nickname)}\nПол: ${form.gender ? 'Мужской 🍏' : 'Женский 🍏'}\nПароль:  ${await this.checkParam(form.password_hash)}\n\n<i>🍏 - обозначает что поле заполненно\n🍎 - обозначает что поле не заполнено</i>\n\n<i>Для изменения полей выберите интересующий Вас параметр ниже</i>`, { reply_markup: menu, parse_mode: 'HTML' })
                .catch((e) => {
                this.log(e.toString());
            });
        };
        this.sendWarning = (ctx, message, timeout) => {
            ctx
                .reply(`<b>Предупреждение!</b>\n${message}`, { parse_mode: 'HTML' })
                .then(async (mess) => {
                setTimeout(() => {
                    ctx.deleteMessages([mess.message_id]);
                }, timeout * 1000);
            });
        };
        this.editMess = new Map();
        this.reactionMess = new Map();
        valid = validator;
        cache = c;
        ik = ink;
        db = dbs;
        hash = hashImport;
        this.userForm = new Map();
        this.init();
        this.Intervals();
    }
    init() {
        const menu = this.returnMenu();
        reg.use(menu);
        console.log('INITED REGISTRATION');
        reg.callbackQuery('startRegistration', async (ctx) => {
            ctx
                .deleteMessages([ctx.callbackQuery.message.message_id])
                .catch(() => { });
            const user = ctx.from;
            this.userForm.set(user.id, {
                last_name: user.last_name,
                first_name: user.first_name ? user.first_name : null,
                patronomic: null,
                mail: null,
                nickname: user.username ? user.username : null,
                gender: true,
                date: {
                    year: null,
                    month: null,
                    day: null,
                },
                password_hash: null,
            });
            const form = this.userForm.get(user.id);
            if (!this.editMess.has(ctx.from.id))
                this.editMess.set(ctx.from.id, new Map());
            await this.sendForm(ctx, form, menu);
        });
        reg.callbackQuery('reg-close', (ctx) => ctx.deleteMessage());
        reg.on(':text', async (ctx, Next) => {
            const message = ctx.message;
            this.log(message.text);
            if (message.reply_to_message && message.reply_to_message.message_id) {
                const mess_id = message.reply_to_message.message_id;
                ctx.deleteMessages([mess_id, message.message_id]);
                if (!this.hasListMessage(ctx.from.id, mess_id)) {
                    return ctx
                        .reply('Данный запрос ударел, пожалуйста создайте Новый')
                        .then(async (mess) => {
                        setTimeout(() => {
                            ctx.deleteMessages([mess.message_id]);
                        }, 3000);
                    })
                        .catch((e) => {
                        console.error(e);
                    });
                }
                const { code } = this.getListMessage(ctx.from.id, mess_id);
                if (code === 'ФИО') {
                    const fio = message.text.split(' ');
                    if (fio.length === 3) {
                        const messEditId = this.hasEditMess(ctx.from.id);
                        const form = this.userForm.get(ctx.from.id);
                        const menu = this.returnMenu();
                        form.last_name = fio[0];
                        form.first_name = fio[1];
                        form.patronomic = fio[2];
                        if (messEditId === false) {
                            await this.sendForm(ctx, form, menu);
                        }
                        else {
                            this.editForm(ctx, messEditId, form, menu);
                        }
                        this.editStatusListMessage(ctx.from.id, mess_id, true);
                    }
                    else {
                        this.editStatusListMessage(ctx.from.id, mess_id, false);
                        this.sendWarning(ctx, 'Вы ввели некоректные данные. Пожалуйста повторите попытку', 5);
                    }
                }
                else if (code == 'почта') {
                    this.log('почта');
                    if (valid.mail(message.text)) {
                        const messEditId = this.hasEditMess(ctx.from.id);
                        const form = this.userForm.get(ctx.from.id);
                        const menu = this.returnMenu();
                        form.mail = message.text;
                        if (messEditId === false) {
                            await this.sendForm(ctx, form, menu);
                        }
                        else {
                            this.editForm(ctx, messEditId, form, menu);
                        }
                        this.editStatusListMessage(ctx.from.id, mess_id, true);
                    }
                    else {
                        this.editStatusListMessage(ctx.from.id, mess_id, false);
                        this.sendWarning(ctx, 'Вы ввели некоректные данные. Пожалуйста повторите попытку', 5);
                    }
                }
                else if (code == 'дата рождения') {
                    if ((0, validator_1.isDate)(message.text)) {
                        const messEditId = this.hasEditMess(ctx.from.id);
                        const form = this.userForm.get(ctx.from.id);
                        const menu = this.returnMenu();
                        form.date_birthday = message.text;
                        if (messEditId === false) {
                            await this.sendForm(ctx, form, menu);
                        }
                        else {
                            this.editForm(ctx, messEditId, form, menu);
                        }
                        this.editStatusListMessage(ctx.from.id, mess_id, true);
                    }
                    else {
                        this.editStatusListMessage(ctx.from.id, mess_id, false);
                        this.sendWarning(ctx, 'Вы ввели некоректные данные. Пожалуйста повторите попытку', 5);
                    }
                }
                else if (code == 'пароль') {
                    this.log('пароль');
                    if (valid.password(message.text)) {
                        const messEditId = this.hasEditMess(ctx.from.id);
                        const form = this.userForm.get(ctx.from.id);
                        const menu = this.returnMenu();
                        form.password_hash = message.text;
                        if (messEditId === false) {
                            await this.sendForm(ctx, form, menu);
                        }
                        else {
                            this.editForm(ctx, messEditId, form, menu);
                        }
                        this.editStatusListMessage(ctx.from.id, mess_id, true);
                    }
                    else {
                        this.editStatusListMessage(ctx.from.id, mess_id, false);
                        this.sendWarning(ctx, 'Вы ввели некоректные данные. Пожалуйста повторите попытку', 5);
                    }
                }
                else if (code == 'никнейм') {
                    if (valid.nickname(message.text)) {
                        const messEditId = this.hasEditMess(ctx.from.id);
                        const form = this.userForm.get(ctx.from.id);
                        const menu = this.returnMenu();
                        form.nickname = message.text;
                        if (messEditId === false) {
                            await this.sendForm(ctx, form, menu);
                        }
                        else {
                            this.editForm(ctx, messEditId, form, menu);
                        }
                        this.editStatusListMessage(ctx.from.id, mess_id, true);
                    }
                    else {
                        this.editStatusListMessage(ctx.from.id, mess_id, false);
                        this.sendWarning(ctx, 'Вы ввели некоректные данные. Пожалуйста повторите попытку', 5);
                    }
                }
                else {
                    Next();
                }
            }
            else {
                Next();
            }
        });
        reg.callbackQuery('registaration-nYear', (ctx) => {
            if (!this.checkHashForm(ctx))
                return;
            const form = this.userForm.get(ctx.from.id);
            form.date.year++;
            this.editCalendar(ctx);
        });
        reg.callbackQuery('registaration-bYear', (ctx) => {
            if (!this.checkHashForm(ctx))
                return;
            const form = this.userForm.get(ctx.from.id);
            form.date.year--;
            this.editCalendar(ctx);
        });
        reg.callbackQuery('registaration-nMonth', (ctx) => {
            if (!this.checkHashForm(ctx))
                return;
            const form = this.userForm.get(ctx.from.id);
            if (form.date.month === 11) {
                form.date.month = 0;
                form.date.year++;
            }
            else
                form.date.month++;
            this.editCalendar(ctx);
        });
        reg.callbackQuery('registaration-bMonth', (ctx) => {
            if (!this.checkHashForm(ctx))
                return;
            const form = this.userForm.get(ctx.from.id);
            if (form.date.month === 0) {
                form.date.month = 11;
                form.date.year--;
            }
            else
                form.date.month--;
            this.editCalendar(ctx);
        });
        reg.callbackQuery('registaration-kd=true', (ctx) => {
            if (!this.checkHashForm(ctx))
                return;
            ctx.answerCallbackQuery('Данная дата уже выбрала');
        });
        reg.callbackQuery('registaration-kd=false', (ctx) => {
            if (!this.checkHashForm(ctx))
                return;
            ctx.answerCallbackQuery('Данная дата недоступна в текущем месяце');
        });
        reg.callbackQuery('registaration-kd-next-hour', (ctx) => {
            if (!this.checkHashForm(ctx))
                return;
            const form = this.userForm.get(ctx.from.id);
            const { day, month, year } = form.date;
            if (day === null || month === null || year === null)
                return ctx.answerCallbackQuery('Сформируйте полностью дату.');
            ctx.deleteMessages([ctx.callbackQuery.message.message_id]).catch((e) => {
                this.log(e.toString());
            });
            const menu = this.returnMenu();
            const messEditId = this.hasEditMess(ctx.from.id);
            if (messEditId === false) {
                this.sendForm(ctx, form, menu);
            }
            else {
                this.editForm(ctx, messEditId, form, menu);
            }
        });
        reg.callbackQuery(/^registaration-kd=.+$/, async (ctx) => {
            if (!this.checkHashForm(ctx))
                return;
            const form = this.userForm.get(ctx.from.id);
            const dayStr = await ctx.callbackQuery.data.split('=')[1];
            console.log(dayStr);
            form.date.day = Number(dayStr);
            this.editCalendar(ctx);
        });
    }
    getComposer() {
        return reg;
    }
}
exports.Registration = Registration;
//# sourceMappingURL=registaration.js.map