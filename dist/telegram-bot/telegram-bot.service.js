"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TBotService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const telegraf_1 = require("telegraf");
const session_1 = require("telegraf/session");
const config_1 = require("@nestjs/config");
const inlinekeyboard_1 = require("./inlinekeyboard");
const cache_service_1 = require("../cache/cache.service");
const database_service_1 = require("../database/database.service");
const class_1 = require("../objects/class");
const barcode_service_1 = require("../barcode/barcode.service");
const base64_service_1 = require("../base64/base64.service");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const string_1 = require("../string/string");
let TBotService = class TBotService {
    constructor(cache, configService, ik, db, bc, bs64, bot) {
        this.cache = cache;
        this.configService = configService;
        this.ik = ik;
        this.db = db;
        this.bc = bc;
        this.bs64 = bs64;
        this.bot = bot;
        this.reactionMess = new Map();
        this.editMess = new Map();
        this.users = new Map();
        this.onStart();
    }
    onStart() {
        this.bot.use((0, session_1.session)());
        this.bot.action(/^disable_register-.+$/, (ctx) => {
            const callbackData = ctx.match[0];
            const code = callbackData.split('-')[1];
            const data = this.cache.getTG(code);
            if (data == undefined)
                return ctx.answerCbQuery('Ваша регистрация просрочена!');
            this.cache.updateBoolTG(code, false);
            return ctx.answerCbQuery('Регистрация отклонена!');
        });
        this.bot.action(/^accept_register-.+$/, (ctx) => {
            const callbackData = ctx.match[0];
            const code = callbackData.split('-')[1];
            const data = this.cache.getTG(code);
            console.log(data);
            if (data == undefined)
                return ctx.answerCbQuery('Ваша регистрация просрочена, повторите попытку');
            this.cache.updateBoolTG(code, true);
            return ctx.answerCbQuery('Успешная регистрация!');
        });
        this.bot.on('text', async (ctx, Next) => {
            if (ctx.text.startsWith('/start'))
                return Next();
            if (!this.users.has(ctx.from.id)) {
                const user_id = await this.db.getUserIdByTelegramId(ctx.from.id);
                console.log(user_id);
                if (!user_id)
                    return ctx.reply(string_1.message.notLog);
                const ui = await this.db.getUserInfo(user_id);
                this.users.set(ctx.from.id, {
                    id_VL: user_id,
                    last_name: ui.last_name,
                    first_name: ui.first_name,
                    patronomic: ui?.patronomic,
                    mail: ui.mail,
                    nickname: ui.nickname,
                    date_birthday: ui.date_birthday,
                    number: ui.number,
                });
            }
            Next();
        });
        this.bot.on('callback_query', async (ctx, Next) => {
            if (!this.users.has(ctx.from.id)) {
                const user_id = await this.db.getUserIdByTelegramId(ctx.from.id);
                console.log(user_id);
                if (!user_id)
                    return ctx.reply(string_1.message.notLog);
                const ui = await this.db.getUserInfo(user_id);
                this.users.set(ctx.from.id, {
                    id_VL: user_id,
                    last_name: ui.last_name,
                    first_name: ui.first_name,
                    patronomic: ui?.patronomic,
                    mail: ui.mail,
                    nickname: ui.nickname,
                    date_birthday: ui.date_birthday,
                    number: ui.number,
                });
            }
            Next();
        });
        this.bot.start(async (ctx) => {
            if (ctx.payload == '')
                return await ctx.reply('Welcome');
            const payload = ctx.payload;
            const [key, value] = payload.split('-');
            if (key == 'register') {
                const from = ctx.from;
                const info = await ctx.telegram.getChat(from.id);
                const checkUser = await this.db.checkUserTgById(from.id);
                console.log(checkUser);
                if (checkUser)
                    return ctx.reply('Данный телеграмм аккаунт уже зарегистрирован!');
                const user = {
                    id: from.id,
                    first_name: from.first_name,
                    bool: null,
                };
                const optionalFields = ['last_name', 'username', 'bio'];
                optionalFields.forEach((field) => {
                    if (info[field] !== undefined) {
                        user[field] = info[field];
                    }
                    else {
                        user[field] = null;
                    }
                });
                const textMessage = `Подтверждение авторизации.\nПожалуйста проверьте ваши данные:\nФамилия: ${user.last_name}\n${user.first_name ? 'Имя: ' + user.last_name + '\n' : ''}${user.bio ? 'Описание: ' + user.bio + '\n' : ''}${user.username ? 'Никнейм: @' + user.username + '\n' : ''}`;
                const photos = await ctx.telegram.getUserProfilePhotos(from.id);
                console.log(photos.photos.length);
                if (photos.photos.length == 0) {
                    user.photo_mini_url = null;
                    user.photo_medium_url = null;
                    user.photo_max_url = null;
                    this.cache.setTG(value, user, 2);
                    return ctx.reply(textMessage, {
                        reply_markup: this.ik.register(value).reply_markup,
                    });
                }
                const lastPhotos = photos.photos[0];
                user.photo_mini_url = (await ctx.telegram.getFileLink(lastPhotos[0].file_id)).toString();
                user.photo_medium_url = (await ctx.telegram.getFileLink(lastPhotos[1].file_id)).toString();
                user.photo_max_url = (await ctx.telegram.getFileLink(lastPhotos[2].file_id)).toString();
                this.cache.setTG(value, user, 1);
                ctx.sendPhoto(lastPhotos[2].file_id, {
                    caption: textMessage,
                    reply_markup: this.ik.register(value).reply_markup,
                });
            }
            else if (key == 'login') {
                const from = ctx.from;
                if (await this.db.checkUserTgById(from.id))
                    return ctx.reply('Данный телеграмм аккаунт уже зарегистрирован!');
                this.cache.setLoginTG(value, { bool: null }, 2);
                ctx.reply('Подтвердите авторизациию в приложении', {
                    reply_markup: this.ik.login(value).reply_markup,
                });
            }
        });
        this.bot.command('barcode', async (ctx) => {
            const mess = await ctx.reply(string_1.message.barcode);
            this.addListMessage(ctx.from.id, mess.message_id, {
                code: 'barcode',
            });
            this.bot.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
        });
        this.bot.command('qrcode', async (ctx) => {
            const mess = await ctx.reply(string_1.message.qrcode);
            this.addListMessage(ctx.from.id, mess.message_id, {
                code: 'qrcode',
            });
            this.bot.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
        });
        this.bot.command(['profile', 'p'], (ctx) => {
            ctx.reply(`${this.users.get(ctx.from.id).nickname}`);
        });
        this.bot.command(['reminders', 'r'], async (ctx) => {
            ctx.deleteMessage();
            const id = this.users.get(ctx.from.id).id_VL;
            const countAll_r = await this.db.getAllRemindersCount(id);
            const countPast_r = await this.db.getPastRemindersCount(id);
            const countFuture_r = await this.db.getFutureRemindersCount(id);
            ctx.reply((0, string_1.messageParams)('reminders', {
                remindersStat: {
                    count: countAll_r,
                    past: countPast_r,
                    future: countFuture_r,
                },
            }), { reply_markup: this.ik.reminders().reply_markup });
        });
        this.bot.command('ck', (ctx) => {
            ctx.reply('check keyboard', {});
        });
        this.bot.on('text', async (ctx) => {
            if (ctx.message.reply_to_message) {
                const res = this.getItemListMess(ctx.from.id, ctx.message.reply_to_message.message_id);
                console.log(ctx.from.id, ctx.message.reply_to_message.message_id);
                console.log(this.reactionMess.get(ctx.from.id));
                if (res === false)
                    return;
                if (res.code == 'barcode') {
                    this.bot.telegram.deleteMessages(ctx.chat.id, [
                        ctx.message.reply_to_message.message_id,
                        ctx.message.message_id,
                    ]);
                    this.reactionMess.delete(ctx.chat.id);
                    const base64 = await this.bc.generateBarcode(ctx.message.text);
                    await this.bs64.base64ToPng(ctx.chat.id, base64);
                    const filePath = path_1.default.resolve(__dirname, `../../public/image/SHK/${ctx.chat.id}.png`);
                    await ctx.sendPhoto({ source: filePath });
                    fs_1.default.unlink(filePath, () => { });
                }
                else if (res.code == 'qrcode') {
                    this.bot.telegram.deleteMessages(ctx.chat.id, [
                        ctx.message.reply_to_message.message_id,
                        ctx.message.message_id,
                    ]);
                    this.reactionMess.delete(ctx.chat.id);
                    const base64 = await this.bc.generateQRcode(ctx.message.text);
                    await this.bs64.base64ToPng(ctx.chat.id, base64);
                    const filePath = path_1.default.resolve(__dirname, `../../public/image/SHK/${ctx.chat.id}.png`);
                    await ctx.sendPhoto({ source: filePath });
                    fs_1.default.unlink(filePath, () => { });
                }
                else if (res.code == 'oneStepCreateReminders') {
                    this.bot.telegram.deleteMessages(ctx.chat.id, [
                        ctx.message.reply_to_message.message_id,
                        ctx.message.message_id,
                    ]);
                    if (!this.users.get(ctx.from.id).reminders)
                        this.users.get(ctx.from.id).reminders = {};
                    this.users.get(ctx.from.id).reminders.createReminder = {
                        title: ctx.text,
                    };
                    this.reactionMess
                        .get(ctx.chat.id)
                        .delete(ctx.message.reply_to_message.message_id);
                    const mess = await ctx.reply('Введите описание или пропустите этот шаг, нажав на кнопку ниже', {
                        reply_markup: this.ik.margeStepCancel({
                            tag: 'reminders',
                            step: 2,
                            boolCancel: true,
                            callback: 'skipTwoStepCreateReminders',
                        }).reply_markup,
                    });
                    this.addListMessage(ctx.from.id, mess.message_id, {
                        code: 'twoStepCreateReminders',
                    });
                }
                else if (res.code == 'twoStepCreateReminders') {
                    this.bot.telegram.deleteMessages(ctx.chat.id, [
                        ctx.message.reply_to_message.message_id,
                        ctx.message.message_id,
                    ]);
                    if (!this.users.get(ctx.from.id).reminders)
                        this.users.get(ctx.from.id).reminders = {};
                    this.users.get(ctx.from.id).reminders.createReminder.description =
                        ctx.text;
                    this.reactionMess
                        .get(ctx.chat.id)
                        .delete(ctx.message.reply_to_message.message_id);
                    const year = new Date().getFullYear();
                    const month = string_1.months;
                    this.setInpDateUser(ctx.from.id);
                    const inpDate = this.users.get(ctx.from.id).inputs.date;
                    await ctx.reply((0, string_1.messageParams)('inpDateReminders', {
                        inpDateReminders: {
                            day: 'дд',
                            month: 'мм',
                            year: 'гггг',
                            hour: 'чч',
                            minute: 'мм',
                        },
                    }), {
                        reply_markup: this.ik.mergeStepKeyboard('reminders', 3, 0, month[inpDate.month], year).reply_markup,
                    });
                }
            }
        });
        this.bot.action('open_all_reminders', async (ctx) => {
            const user = this.users.get(ctx.from.id);
            const reminders = await this.db.getAllReminders(user.id_VL);
            for (const item of reminders) {
                const date = `${item.time.getDay()}.${item.time.getMonth() + 1}.${item.time.getFullYear()}`;
                const time = `${item.time.getHours()}:${item.time.getMinutes()}`;
                user.reminders = {};
                user.reminders.all = [];
                user.reminders.all.push({
                    id: item.reminders_id,
                    title: item.name,
                    description: item.description,
                    date: date,
                    time: time,
                });
            }
            ctx.reply(`<b>Название:</b> ${user.reminders.all[0].title}\n<b>Описание:</b> ${user.reminders.all[0].description}\n<b>Дата и время:</b> ${user.reminders.all[0].date} ${user.reminders.all[0].time}`, {
                parse_mode: 'HTML',
                reply_markup: this.ik.boxSlider('reminders', user.reminders.all[0].id, {
                    view: false,
                    delete: true,
                }).reply_markup,
            });
        });
        this.bot.action('reminders-bMonth', async (ctx) => {
            const user = this.users.get(ctx.from.id);
            if (!this.checkExistUserData(ctx, user))
                return;
            if (!user || !user.reminders || !user.reminders.createReminder) {
                ctx.answerCbQuery('Данные потеряны. Пожалуйста повторите попытку!', {
                    show_alert: true,
                });
                return ctx.deleteMessage();
            }
            if (!user.inputs || !user.inputs.date) {
                this.setInpDateUser(ctx.from.id);
            }
            if (user.inputs.date.month == 0) {
                user.inputs.date.month = 11;
                user.inputs.date.year--;
            }
            else
                user.inputs.date.month--;
            const text = (0, string_1.messageParams)('inpDateReminders', {
                inpDateReminders: {
                    day: user.inputs.date.day ?? 'дд',
                    month: string_1.months[user.inputs.date.month].num ?? 'мм',
                    year: user.inputs.date.year ?? 'гггг',
                    hour: user.inputs.date.hour ?? 'чч',
                    minute: user.inputs.date.minute ?? 'мм',
                },
            });
            ctx.editMessageText(text, {
                reply_markup: this.ik.mergeStepKeyboard('reminders', 3, user.inputs.date.day ?? 0, string_1.months[user.inputs.date.month], user.inputs.date.year).reply_markup,
            });
        });
        this.bot.action('reminders-nMonth', async (ctx) => {
            const user = this.users.get(ctx.from.id);
            if (!this.checkExistUserData(ctx, user))
                return;
            if (user.inputs.date.month == 11) {
                user.inputs.date.month = 0;
                user.inputs.date.year++;
            }
            else
                user.inputs.date.month++;
            if (user.inputs.date.day > string_1.months[user.inputs.date.month].countDay)
                user.inputs.date.day = string_1.months[user.inputs.date.month].countDay;
            const text = (0, string_1.messageParams)('inpDateReminders', {
                inpDateReminders: {
                    day: user.inputs.date.day ?? 'дд',
                    month: string_1.months[user.inputs.date.month].num ?? 'мм',
                    year: user.inputs.date.year ?? 'гггг',
                    hour: user.inputs.date.hour ?? 'чч',
                    minute: user.inputs.date.minute ?? 'мм',
                },
            });
            ctx.editMessageText(text, {
                reply_markup: this.ik.mergeStepKeyboard('reminders', 3, user.inputs.date.day ?? 0, string_1.months[user.inputs.date.month], user.inputs.date.year).reply_markup,
            });
        });
        this.bot.action('reminders-nYear', async (ctx) => {
            const user = this.users.get(ctx.from.id);
            if (!this.checkExistUserData(ctx, user))
                return;
            user.inputs.date.year++;
            console.log(user.inputs.date.month, string_1.months[user.inputs.date.month], user.inputs.date.month);
            const text = (0, string_1.messageParams)('inpDateReminders', {
                inpDateReminders: {
                    day: user.inputs.date.day ?? 'дд',
                    month: string_1.months[user.inputs.date.month].num ?? 'мм',
                    year: user.inputs.date.year ?? 'гггг',
                    hour: user.inputs.date.hour ?? 'чч',
                    minute: user.inputs.date.minute ?? 'мм',
                },
            });
            ctx.editMessageText(text, {
                reply_markup: this.ik.mergeStepKeyboard('reminders', 3, user.inputs.date.day ?? 0, string_1.months[user.inputs.date.month], user.inputs.date.year).reply_markup,
            });
        });
        this.bot.action('reminders-bYear', async (ctx) => {
            const user = this.users.get(ctx.from.id);
            if (!this.checkExistUserData(ctx, user))
                return;
            user.inputs.date.year--;
            console.log(user.inputs.date.month, string_1.months[user.inputs.date.month], user.inputs.date.month);
            const text = (0, string_1.messageParams)('inpDateReminders', {
                inpDateReminders: {
                    day: user.inputs.date.day ?? 'дд',
                    month: string_1.months[user.inputs.date.month].num ?? 'мм',
                    year: user.inputs.date.year ?? 'гггг',
                    hour: user.inputs.date.hour ?? 'чч',
                    minute: user.inputs.date.minute ?? 'мм',
                },
            });
            ctx.editMessageText(text, {
                reply_markup: this.ik.mergeStepKeyboard('reminders', 3, user.inputs.date.day ?? 0, string_1.months[user.inputs.date.month], user.inputs.date.year).reply_markup,
            });
        });
        this.bot.action('reminders-cancel', (ctx) => {
            ctx.deleteMessage();
        });
        this.bot.action('reminders-kh-next-minute', (ctx) => {
            const user = this.users.get(ctx.from.id);
            if (!this.checkExistData(ctx, user))
                return;
            if (user.inputs.date.formatTime == 'PM')
                user.inputs.date.hour = user.inputs.date.hour + 12;
            user.inputs.date.minute = 30;
            const text = (0, string_1.messageParams)('inpDateReminders', {
                inpDateReminders: {
                    day: user.inputs.date.day ?? 'дд',
                    month: string_1.months[user.inputs.date.month].num ?? 'мм',
                    year: user.inputs.date.year ?? 'гггг',
                    hour: user.inputs.date.hour ?? 'чч',
                    minute: user.inputs.date.minute ?? 'мм',
                },
            });
            ctx.editMessageText(text, {
                reply_markup: this.ik.margeStepMinute({
                    tag: 'reminders',
                    step: 3,
                    thisMinute: user.inputs.date.minute,
                }).reply_markup,
            });
        });
        this.bot.action('reminders-kmp-save', (ctx) => {
            const user = this.users.get(ctx.from.id);
            if (!this.checkExistData(ctx, user))
                return;
            const { day, month, year, hour, minute } = user.inputs.date;
            const date = `${day < 10 ? '0' + day : day}.${month + 1 < 10 ? '0' + (month + 1) : month + 1}.${year}`;
            const time = `${hour == 24 ? '00' : hour}:${minute < 10 ? '0' + minute : minute}`;
            user.reminders.createReminder.date = date;
            user.reminders.createReminder.time = time;
            ctx.editMessageText((0, string_1.messageParams)('allDataReminders', {
                reminder: {
                    title: user.reminders.createReminder.title,
                    description: user.reminders.createReminder.description,
                    date: user.reminders.createReminder.date,
                    time: user.reminders.createReminder.time,
                },
            }), {
                parse_mode: 'HTML',
                reply_markup: this.ik.saveKeyboard('reminders').reply_markup,
            });
        });
        this.bot.action('reminders-save', async (ctx) => {
            const user = this.users.get(ctx.from.id);
            if (!this.checkExistData(ctx, user))
                return;
            ctx.deleteMessage();
            await this.db.addRemindersUser(user.id_VL, user.reminders.createReminder);
            ctx.answerCbQuery('Напоминание создано!', { show_alert: true });
        });
        this.bot.action(/^reminders-kmp=.+$/, (ctx) => {
            const user = this.users.get(ctx.from.id);
            if (!this.checkExistData(ctx, user))
                return;
            const num = ctx.match[0].split('=')[1];
            user.inputs.date.minute + Number(num) > 59
                ? (user.inputs.date.minute = 59)
                : (user.inputs.date.minute = user.inputs.date.minute + Number(num));
            console.log(user.inputs.date.minute, Number(num));
            const text = (0, string_1.messageParams)('inpDateReminders', {
                inpDateReminders: {
                    day: user.inputs.date.day ?? 'дд',
                    month: string_1.months[user.inputs.date.month].num ?? 'мм',
                    year: user.inputs.date.year ?? 'гггг',
                    hour: user.inputs.date.hour ?? 'чч',
                    minute: user.inputs.date.minute
                        ? user.inputs.date.minute < 10
                            ? '0' + user.inputs.date.minute
                            : user.inputs.date.minute
                        : 'мм',
                },
            });
            ctx
                .editMessageText(text, {
                reply_markup: this.ik.margeStepMinute({
                    tag: 'reminders',
                    step: 3,
                    thisMinute: user.inputs.date.minute,
                }).reply_markup,
            })
                .catch(() => { });
        });
        this.bot.action(/^reminders-kmm=.+$/, (ctx) => {
            const user = this.users.get(ctx.from.id);
            if (!this.checkExistData(ctx, user))
                return;
            const num = ctx.match[0].split('=')[1];
            user.inputs.date.minute - Number(num) < 0
                ? (user.inputs.date.minute = 0)
                : (user.inputs.date.minute = user.inputs.date.minute - Number(num));
            console.log(user.inputs.date.minute, Number(num));
            const text = (0, string_1.messageParams)('inpDateReminders', {
                inpDateReminders: {
                    day: user.inputs.date.day ?? 'дд',
                    month: string_1.months[user.inputs.date.month].num ?? 'мм',
                    year: user.inputs.date.year ?? 'гггг',
                    hour: user.inputs.date.hour ?? 'чч',
                    minute: user.inputs.date.minute < 10
                        ? '0' + user.inputs.date.minute
                        : user.inputs.date.minute ?? 'мм',
                },
            });
            ctx
                .editMessageText(text, {
                reply_markup: this.ik.margeStepMinute({
                    tag: 'reminders',
                    step: 3,
                    thisMinute: user.inputs.date.minute,
                }).reply_markup,
                parse_mode: 'HTML',
            })
                .catch(() => { });
        });
        this.bot.action([/^.+-kh=AM$/, /^.+-kh=PM$/], (ctx) => {
            const user = this.users.get(ctx.from.id);
            if (!this.checkExistData(ctx, user))
                return;
            const format = ctx.match[0].split('=')[1];
            ctx.answerCbQuery(format);
            if (format == user.inputs.date.formatTime)
                return;
            user.inputs.date.formatTime = format == 'AM' ? 'AM' : 'PM';
            const text = (0, string_1.messageParams)('inpDateReminders', {
                inpDateReminders: {
                    day: user.inputs.date.day ?? 'дд',
                    month: string_1.months[user.inputs.date.month].num ?? 'мм',
                    year: user.inputs.date.year ?? 'гггг',
                    hour: user.inputs.date.hour
                        ? user.inputs.date.formatTime == 'PM'
                            ? user.inputs.date.hour + 12
                            : user.inputs.date.hour
                        : 'чч',
                    minute: user.inputs.date.minute ?? 'мм',
                },
            });
            ctx.editMessageText(text, {
                reply_markup: this.ik.margeStepHour({
                    tag: 'reminders',
                    step: 3,
                    thisHour: !user.inputs.date.hour ? 24 : user.inputs.date.hour,
                    format: user.inputs.date.formatTime,
                }).reply_markup,
            });
        });
        this.bot.action(/^reminders-kh=.+$/, (ctx) => {
            const user = this.users.get(ctx.from.id);
            if (!this.checkExistData(ctx, user))
                return;
            const hour = ctx.match[0].split('=')[1];
            if (hour == 'true')
                return ctx.answerCbQuery('Вы уже выбрали данный час');
            user.inputs.date.hour = Number(hour);
            const text = (0, string_1.messageParams)('inpDateReminders', {
                inpDateReminders: {
                    day: user.inputs.date.day ?? 'дд',
                    month: string_1.months[user.inputs.date.month].num ?? 'мм',
                    year: user.inputs.date.year ?? 'гггг',
                    hour: user.inputs.date.formatTime == 'PM'
                        ? user.inputs.date.hour + 12
                        : user.inputs.date.hour,
                    minute: user.inputs.date.minute ?? 'мм',
                },
            });
            ctx.editMessageText(text, {
                reply_markup: this.ik.margeStepHour({
                    tag: 'reminders',
                    step: 3,
                    thisHour: !user.inputs.date.hour ? 24 : user.inputs.date.hour,
                    format: user.inputs.date.formatTime,
                }).reply_markup,
            });
        });
        this.bot.action(/^.+-kd-next-hour$/, (ctx) => {
            const user = this.users.get(ctx.from.id);
            if (!this.checkExistData(ctx, user))
                return;
            const text = (0, string_1.messageParams)('inpDateReminders', {
                inpDateReminders: {
                    day: user.inputs.date.day ?? 'дд',
                    month: string_1.months[user.inputs.date.month].num ?? 'мм',
                    year: user.inputs.date.year ?? 'гггг',
                    hour: user.inputs.date.hour ?? 'чч',
                    minute: user.inputs.date.minute ?? 'мм',
                },
            });
            user.inputs.date.formatTime = 'AM';
            ctx.editMessageText(text, {
                reply_markup: this.ik.margeStepHour({
                    tag: 'reminders',
                    step: 3,
                    thisHour: 24,
                    format: user.inputs.date.formatTime,
                }).reply_markup,
            });
        });
        this.bot.action(/^.+-kd=false$/, (ctx) => {
            ctx.answerCbQuery('Данное число в этом месяце не доступно');
        });
        this.bot.action(/^.+-kd=true$/, (ctx) => {
            console.log('Данное число уже выбрано');
            ctx.answerCbQuery('Данное число уже выбрано');
        });
        this.bot.action(/^reminders-kd.+$/, (ctx) => {
            const user = this.users.get(ctx.from.id);
            if (!this.checkExistData(ctx, user))
                return;
            const number = ctx.match[0].split('=')[1];
            console.log(number);
            user.inputs.date.day = Number(number);
            const text = (0, string_1.messageParams)('inpDateReminders', {
                inpDateReminders: {
                    day: user.inputs.date.day ?? 'дд',
                    month: string_1.months[user.inputs.date.month].num ?? 'мм',
                    year: user.inputs.date.year ?? 'гггг',
                    hour: user.inputs.date.hour ?? 'чч',
                    minute: user.inputs.date.minute ?? 'мм',
                },
            });
            ctx.editMessageText(text, {
                reply_markup: this.ik.mergeStepKeyboard('reminders', 3, user.inputs.date.day ?? 0, string_1.months[user.inputs.date.month], user.inputs.date.year).reply_markup,
            });
        });
        this.bot.action(/^disable_login-.+$/, (ctx) => {
            const callbackData = ctx.match[0];
            const code = callbackData.split('-')[1];
            const data = this.cache.getLoginTG(code);
            if (data == undefined)
                return ctx.answerCbQuery('Ваша авторизация просрочена!');
            this.cache.setLoginTG(code, { bool: false }, 2);
            return ctx.answerCbQuery('Авторизация отклонена!');
        });
        this.bot.action(/^accept_login-.+$/, async (ctx) => {
            const callbackData = ctx.match[0];
            const code = callbackData.split('-')[1];
            const data = this.cache.getLoginTG(code);
            if (data == undefined)
                return ctx.answerCbQuery('Ваша авторизация просрочена, повторите попытку');
            const rand = new class_1.Random(15);
            const str = await rand.generateString();
            const from = ctx.update.callback_query.from;
            const id = await this.db.getUserIdByTelegramId(from.id);
            await this.db.createSession(str, id);
            this.cache.setLoginTG(code, { bool: true, session: str }, 2);
            return ctx.answerCbQuery('Успешная авторизация!');
        });
        this.bot.action('create_reminders', async (ctx) => {
            ctx.deleteMessage();
            const mess = await ctx.reply(string_1.message.remindersCreateStepOne, {
                reply_markup: this.ik.margeStepCancel({
                    tag: 'reminders',
                    step: 1,
                    boolCancel: true,
                }).reply_markup,
                parse_mode: 'HTML',
            });
            this.addListMessage(ctx.from.id, mess.message_id, {
                code: 'oneStepCreateReminders',
            });
        });
    }
    addListMessage(id, key, mess) {
        if (!this.reactionMess.has(id)) {
            this.reactionMess.set(id, new Map());
        }
        this.reactionMess.get(id)?.set(key, mess);
    }
    addListEditMessage(id, key, mess_id) {
        if (!this.editMess.has(id)) {
            this.editMess.set(id, new Map());
        }
        this.editMess.get(id)?.set(key, mess_id);
    }
    getItemListMess(id, key) {
        if (!this.reactionMess.has(id))
            return false;
        if (!this.reactionMess.get(id).has(key))
            return false;
        return this.reactionMess.get(id).get(key);
    }
    getItemListEditMess(id, key) {
        if (!this.editMess.has(id))
            return false;
        if (!this.editMess.get(id).has(key))
            return false;
        return this.editMess.get(id).get(key);
    }
    setInpDateUser(id) {
        if (!this.users.get(id).inputs) {
            this.users.get(id).inputs = {};
            const date = new Date();
            return (this.users.get(id).inputs.date = {
                year: date.getFullYear(),
                month: date.getMonth(),
            });
        }
        if (!this.users.get(id).inputs.date) {
            const date = new Date();
            return (this.users.get(id).inputs.date = {
                year: date.getFullYear(),
                month: date.getMonth(),
            });
        }
    }
    checkExistData(ctx, user) {
        if (!user || !user.reminders || !user.reminders.createReminder) {
            ctx.answerCbQuery('Данные потеряны. Пожалуйста повторите попытку!', {
                show_alert: true,
            });
            ctx.deleteMessage();
            return false;
        }
        if (!user.inputs || !user.inputs.date) {
            ctx.answerCbQuery('Данные потеряны. Пожалуйста повторите попытку!', {
                show_alert: true,
            });
            ctx.deleteMessage();
            return false;
        }
        return true;
    }
    checkExistUserData(ctx, user) {
        if (!user || !user.reminders || !user.reminders.createReminder) {
            ctx.answerCbQuery('Данные потеряны. Пожалуйста повторите попытку!', {
                show_alert: true,
            });
            ctx.deleteMessage();
            return false;
        }
        if (!user.inputs || !user.inputs.date) {
            this.setInpDateUser(ctx.from.id);
        }
        return true;
    }
};
exports.TBotService = TBotService;
exports.TBotService = TBotService = __decorate([
    (0, common_1.Injectable)(),
    __param(6, (0, nestjs_telegraf_1.InjectBot)()),
    __metadata("design:paramtypes", [cache_service_1.CacheService,
        config_1.ConfigService,
        inlinekeyboard_1.InlineKeyboard,
        database_service_1.DatabaseService,
        barcode_service_1.BarcodeService,
        base64_service_1.Base64Service,
        telegraf_1.Telegraf])
], TBotService);
//# sourceMappingURL=telegram-bot.service.js.map