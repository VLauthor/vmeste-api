import { Injectable, OnModuleInit } from '@nestjs/common';
import { Bot, InputFile, Keyboard } from 'grammy';
import { FileFlavor, hydrateFiles } from '@grammyjs/files';
import { Menu, MenuRange } from '@grammyjs/menu';
import { ConfService } from '../config/configuration.service';
import { CacheTelegram, Mess, TelegramUserData } from '../objects/interfaces';
import { InlineKeyboards } from './inlinekeyboard';
import { CacheService } from 'src/cache/cache.service';
import { DatabaseService } from 'src/database/database.service';
import { Random } from 'src/objects/class';
import { BarcodeService } from 'src/barcode/barcode.service';
import { Base64Service } from 'src/base64/base64.service';
import fs from 'fs';
import path from 'path';
import { message, messageParams, months } from 'src/string/string';
import { todo } from 'node:test';

@Injectable()
export class TBotService implements OnModuleInit {
  private users: Map<number, TelegramUserData>;
  private reactionMess: Map<number, Map<number, Mess>>;
  private editMess: Map<number, Map<string, number>>;
  private bot: Bot;
  constructor(
    private readonly cache: CacheService,
    private ik: InlineKeyboards,
    private db: DatabaseService,
    private bc: BarcodeService,
    private bs64: Base64Service,
    private configService: ConfService,
  ) {
    this.bot = new Bot(this.configService.returnTgToken());
    this.reactionMess = new Map<number, Map<number, Mess>>();
    this.editMess = new Map<number, Map<string, number>>();
    this.users = new Map<number, TelegramUserData>();
  }
  onModuleInit() {
    this.onStart();
  }

  onStart() {
    this.bot.start();
    const main = new Menu('root-menu')
      .text('Поздороваться!', (ctx) => ctx.reply('Привет!'))
      .row()
      .submenu('Возможности', 'credits-menu');
    const settings = new Menu('credits-menu', { onMenuOutdated: 'Обновляем' })
      .text('Отправка сообщения', (ctx) => ctx.reply('Сообщение'))
      .row()
      .dynamic(() => {
        const range = new MenuRange();
        for (let i = 0; i < 3; i++) {
          range.text(i.toString(), (ctx) => ctx.reply(`You chose ${i}`)).row();
        }
        return range;
      })
      .row()
      .text(
        () => `Нынешнее время ${new Date().toLocaleTimeString()}`,
        (ctx) => ctx.menu.update,
      )
      .row()
      .back('Вернуться');
    main.register(settings);
    this.bot.use(main);
    this.bot.use(settings);
    this.bot.use();
    this.bot.command('menu', async (ctx) => {
      await ctx.reply('Меню наших возмжностей', { reply_markup: main });
    });
    this.bot.command('stop', async (ctx) => {
      if (ctx.from.id == 622692773) {
      }
    });
    this.bot.callbackQuery(/^disable_register-.+$/, (ctx) => {
      const callbackData = ctx.match[0];
      const code = callbackData.split('-')[1];
      const data = this.cache.getTG(code);
      if (data == undefined)
        return ctx.answerCallbackQuery('Ваша регистрация просрочена!');
      this.cache.updateBoolTG(code, false);
      return ctx.answerCallbackQuery('Регистрация отклонена!');
    });
    this.bot.callbackQuery(/^accept_register-.+$/, (ctx) => {
      const callbackData = ctx.match[0];
      const code = callbackData.split('-')[1];
      const data = this.cache.getTG(code);
      console.log(data);
      if (data == undefined)
        return ctx.answerCallbackQuery(
          'Ваша регистрация просрочена, повторите попытку',
        );
      this.cache.updateBoolTG(code, true);
      return ctx.answerCallbackQuery('Успешная регистрация!');
    });

    this.bot.on('message:text', async (ctx, Next) => {
      if (ctx.message.text.startsWith('/start')) return Next();
      if (!this.users.has(ctx.from.id)) {
        const user_id = await this.db.getUserIdByTelegramId(ctx.from.id);
        console.log(user_id);
        if (!user_id) return ctx.reply(message.notLog);
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
        // return ctx.reply(message.notLog);
      }
      Next();
    });
    this.bot.on(':voice', async (ctx) => {
      // this.bot.api.forwardMessage(
      //   ctx.from.id,
      //   ctx.from.id,
      //   ctx.message.message_id,
      // );
      const file_id = await this.bot.api.getFile(ctx.message.voice.file_id);
      const fileUrl = `https://api.telegram.org/file/bot/${this.bot.token}/${file_id.file_id}`;
      ctx.reply(fileUrl, {
        reply_parameters: { message_id: ctx.message.message_id },
      });
      console.log(file_id, fileUrl);
    });
    todo('test');
    this.bot.command('testkeyboard', (ctx) => {
      const keyboard = new Keyboard()
        .text('Yes, they certainly are')
        .row()
        .text("I'm not quite sure")
        .row()
        .text('No. 😈')
        .resized()
        .oneTime(true)
        .placeholder('хуй');
      ctx.reply('a', { reply_markup: keyboard });
    });
    this.bot.inlineQuery(/best bot (framework|library)/, async (ctx) => {
      const match = ctx.match; // regex match object
      const query = ctx.inlineQuery.query; // query string
      console.log(match, query);
    });
    this.bot.on('inline_query', async (ctx) => {
      const query = ctx.inlineQuery.query; // query string
      console.log(query);
    });
    this.bot.on('message::url', (ctx) => console.log(ctx));
    this.bot.on('callback_query', async (ctx, Next) => {
      if (!this.users.has(ctx.from.id)) {
        const user_id = await this.db.getUserIdByTelegramId(ctx.from.id);
        console.log(user_id);
        if (!user_id) return ctx.reply(message.notLog);
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
        // return ctx.reply(message.notLog);
      }
      Next();
    });
    this.bot.command('start', async (ctx) => {
      if (ctx.match == '') return await ctx.reply('Welcome');
      const payload = ctx.match;
      const [key, value] = payload.split('-');

      if (key == 'register') {
        const from = ctx.from;
        const info = await ctx.api.getChat(from.id);
        const checkUser = await this.db.checkUserTgById(from.id);
        console.log(checkUser);
        if (checkUser)
          return ctx.reply('Данный телеграмм аккаунт уже зарегистрирован!');
        const user: CacheTelegram = {
          id: from.id,
          first_name: from.first_name,
          bool: null,
        };
        const optionalFields = ['last_name', 'username', 'bio'];
        optionalFields.forEach((field) => {
          if (info[field] !== undefined) {
            (user as any)[field] = info[field];
          } else {
            (user as any)[field] = null;
          }
        });
        // const xd = await ctx.telegram.getChat(from.id);
        // console.log(xd);
        const textMessage = `Подтверждение авторизации.\nПожалуйста проверьте ваши данные:\nФамилия: ${user.last_name}\n${user.first_name ? 'Имя: ' + user.last_name + '\n' : ''}${user.bio ? 'Описание: ' + user.bio + '\n' : ''}${user.username ? 'Никнейм: @' + user.username + '\n' : ''}`;
        const photos = await ctx.api.getUserProfilePhotos(from.id);
        console.log(photos.photos.length);
        if (photos.photos.length == 0) {
          user.photo_mini_url = null;
          user.photo_medium_url = null;
          user.photo_max_url = null;
          this.cache.setTG(value, user, 2);
          return ctx.reply(textMessage, {
            reply_markup: this.ik.register(value),
          });
        }
        const lastPhotos = photos.photos[0];
        user.photo_mini_url = (
          await ctx.api.getFile(lastPhotos[0].file_id)
        ).toString();
        user.photo_medium_url = (
          await ctx.api.getFile(lastPhotos[1].file_id)
        ).toString();
        user.photo_max_url = (
          await ctx.api.getFile(lastPhotos[2].file_id)
        ).toString();
        this.cache.setTG(value, user, 1);
        ctx.replyWithPhoto(lastPhotos[2].file_id, {
          caption: textMessage,
          reply_markup: this.ik.register(value),
        });
      } else if (key == 'login') {
        const from = ctx.from;
        if (await this.db.checkUserTgById(from.id))
          return ctx.reply('Данный телеграмм аккаунт уже зарегистрирован!');
        this.cache.setLoginTG(value, { bool: null }, 2);
        ctx.reply('Подтвердите авторизациию в приложении', {
          reply_markup: this.ik.login(value),
        });
      }
    });
    this.bot.command('barcode', async (ctx) => {
      const mess = await ctx.reply(message.barcode);
      this.addListMessage(ctx.from.id, mess.message_id, {
        code: 'barcode',
      });
      this.bot.api.deleteMessage(ctx.chat.id, ctx.message.message_id);
    });
    this.bot.command('qrcode', async (ctx) => {
      const mess = await ctx.reply(message.qrcode);
      this.addListMessage(ctx.from.id, mess.message_id, {
        code: 'qrcode',
      });
      this.bot.api.deleteMessage(ctx.chat.id, ctx.message.message_id);
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
      ctx.reply(
        messageParams('reminders', {
          remindersStat: {
            count: countAll_r,
            past: countPast_r,
            future: countFuture_r,
          },
        }),
        { reply_markup: this.ik.reminders() },
      );
    });
    this.bot.command('ck', (ctx) => {
      ctx.reply('check keyboard', {
        // reply_markup: this.ik.boxSlider('test', 1).reply_markup,
      });
    });
    // this.bot.on('text', async (ctx) => console.log(ctx));
    this.bot.on('message', async (ctx) => {
      if (ctx.message.reply_to_message) {
        const res = this.getItemListMess(
          ctx.from.id,
          ctx.message.reply_to_message.message_id,
        );
        console.log(ctx.from.id, ctx.message.reply_to_message.message_id);
        console.log(this.reactionMess.get(ctx.from.id));
        if (res === false) return;
        if (res.code == 'barcode') {
          this.bot.api.deleteMessages(ctx.chat.id, [
            ctx.message.reply_to_message.message_id,
            ctx.message.message_id,
          ]);
          this.reactionMess.delete(ctx.chat.id);
          const base64 = await this.bc.generateBarcode(ctx.message.text);
          await this.bs64.base64ToPng(ctx.chat.id, base64);
          const filePath = path.resolve(
            __dirname,
            `../../public/image/SHK/${ctx.chat.id}.png`,
          );
          const photo = new InputFile(filePath);

          await ctx.replyWithPhoto(photo);
          fs.unlink(filePath, () => {});
        } else if (res.code == 'qrcode') {
          this.bot.api.deleteMessages(ctx.chat.id, [
            ctx.message.reply_to_message.message_id,
            ctx.message.message_id,
          ]);
          this.reactionMess.delete(ctx.chat.id);
          const base64 = await this.bc.generateQRcode(ctx.message.text);
          await this.bs64.base64ToPng(ctx.chat.id, base64);
          const filePath = path.resolve(
            __dirname,
            `../../public/image/SHK/${ctx.chat.id}.png`,
          );
          const photo = new InputFile(filePath);
          await ctx.replyWithPhoto(photo);
          fs.unlink(filePath, () => {});
        } else if (res.code == 'oneStepCreateReminders') {
          this.bot.api.deleteMessages(ctx.chat.id, [
            ctx.message.reply_to_message.message_id,
            ctx.message.message_id,
          ]);
          if (!this.users.get(ctx.from.id).reminders)
            this.users.get(ctx.from.id).reminders = {};
          this.users.get(ctx.from.id).reminders.createReminder = {
            title: ctx.message.text,
          };
          this.reactionMess
            .get(ctx.chat.id)
            .delete(ctx.message.reply_to_message.message_id);
          const mess = await ctx.reply(
            'Введите описание или пропустите этот шаг, нажав на кнопку ниже',
            {
              reply_markup: this.ik.margeStepCancel({
                tag: 'reminders',
                step: 2,
                boolCancel: true,
                callback: 'skipTwoStepCreateReminders',
              }),
            },
          );
          this.addListMessage(ctx.from.id, mess.message_id, {
            code: 'twoStepCreateReminders',
          });
        } else if (res.code == 'twoStepCreateReminders') {
          this.bot.api.deleteMessages(ctx.chat.id, [
            ctx.message.reply_to_message.message_id,
            ctx.message.message_id,
          ]);
          if (!this.users.get(ctx.from.id).reminders)
            this.users.get(ctx.from.id).reminders = {};
          this.users.get(ctx.from.id).reminders.createReminder.description =
            ctx.message.text;
          this.reactionMess
            .get(ctx.chat.id)
            .delete(ctx.message.reply_to_message.message_id);
          const year = new Date().getFullYear();
          const month = months;
          this.setInpDateUser(ctx.from.id);
          const inpDate = this.users.get(ctx.from.id).inputs.date;
          await ctx.reply(
            messageParams('inpDateReminders', {
              inpDateReminders: {
                day: 'дд',
                month: 'мм',
                year: 'гггг',
                hour: 'чч',
                minute: 'мм',
              },
            }),
            {
              reply_markup: this.ik.mergeStepKeyboard(
                'reminders',
                3,
                0,
                month[inpDate.month],
                year,
              ),
            },
          );
        }
      }
    });
    this.bot.callbackQuery('open_all_reminders', async (ctx) => {
      const user = this.users.get(ctx.from.id);
      if (!user) {
        ctx.answerCallbackQuery('Ваши данные потеряны');
        ctx.deleteMessage();
        return false;
      }
      if (!user.reminders) {
        user.reminders = {};
      }
      user.reminders.all = [];
      const reminders = await this.db.getAllReminders(user.id_VL);
      for (const item of reminders) {
        const { date, time } = this.formatDateString(item.time);
        user.reminders.all.push({
          reminders_id: item.reminders_id,
          title: item.name,
          description: item.description,
          date: date,
          time: time,
        });
      }
      if (user.reminders.all.length == 0) {
        ctx.answerCallbackQuery('У вас нету заметок в данной категории');
        return false;
      }
      this.delSlider(ctx);
      user.slider = { thisI: 0, count: user.reminders.all.length };
      const msg = await ctx.reply(
        messageParams('allDataReminders', {
          reminder: user.reminders.all[user.slider.thisI],
        }),
        {
          parse_mode: 'HTML',
          reply_markup: this.ik.boxSlider(
            'reminders',
            user.reminders.all[user.slider.thisI].reminders_id,
            {
              view: false,
              delete: true,
            },
          ),
        },
      );
      this.addListEditMessage(ctx.from.id, 'slider', msg.message_id);
    });
    this.bot.callbackQuery('open_past_reminders', async (ctx) => {
      const user = this.users.get(ctx.from.id);
      if (!user) {
        ctx.answerCallbackQuery('Ваши данные потеряны');
        ctx.deleteMessage();
        return false;
      }
      if (!user.reminders) {
        user.reminders = {};
      }
      user.reminders.all = [];
      const reminders = await this.db.getPastReminders(user.id_VL);
      for (const item of reminders) {
        const { date, time } = this.formatDateString(item.time);
        user.reminders.all.push({
          reminders_id: item.reminders_id,
          title: item.name,
          description: item.description,
          date: date,
          time: time,
        });
      }
      if (user.reminders.all.length == 0) {
        ctx.answerCallbackQuery('У вас нету заметок в данной категории');
        return false;
      }
      this.delSlider(ctx);
      user.slider = { thisI: 0, count: user.reminders.all.length };
      const msg = await ctx.reply(
        messageParams('allDataReminders', {
          reminder: user.reminders.all[user.slider.thisI],
        }),
        {
          parse_mode: 'HTML',
          reply_markup: this.ik.boxSlider(
            'reminders-past',
            user.reminders.all[user.slider.thisI].reminders_id,
            {
              view: false,
              delete: true,
            },
          ),
        },
      );
      this.addListEditMessage(ctx.from.id, 'slider', msg.message_id);
    });
    this.bot.callbackQuery('open_future_reminders', async (ctx) => {
      const user = this.users.get(ctx.from.id);
      if (!user) {
        ctx.answerCallbackQuery('Ваши данные потеряны');
        ctx.deleteMessage();
        return false;
      }
      if (!user.reminders) {
        user.reminders = {};
      }
      user.reminders.all = [];
      const reminders = await this.db.getFutureReminders(user.id_VL);
      for (const item of reminders) {
        const { date, time } = this.formatDateString(item.time);
        user.reminders.all.push({
          reminders_id: item.reminders_id,
          title: item.name,
          description: item.description,
          date: date,
          time: time,
        });
      }
      if (user.reminders.all.length == 0) {
        ctx.answerCallbackQuery('У вас нету заметок в данной категории');
        return false;
      }
      this.delSlider(ctx);
      user.slider = { thisI: 0, count: user.reminders.all.length };
      const msg = await ctx.reply(
        messageParams('allDataReminders', {
          reminder: user.reminders.all[user.slider.thisI],
        }),
        {
          parse_mode: 'HTML',
          reply_markup: this.ik.boxSlider(
            'reminders-future',
            user.reminders.all[user.slider.thisI].reminders_id,
            {
              view: false,
              delete: true,
            },
          ),
        },
      );
      this.addListEditMessage(ctx.from.id, 'slider', msg.message_id);
    });
    this.bot.callbackQuery('open_last_reminders', async (ctx) => {
      const user = this.users.get(ctx.from.id);
      if (!user) {
        ctx.answerCallbackQuery('Ваши данные потеряны');
        ctx.deleteMessage();
        return false;
      }
      //
      const reminders = await this.db.getFirstReminders(user.id_VL);
      if (reminders == null)
        return ctx.answerCallbackQuery('У вас нету заметок в данной категории');
      const { date, time } = this.formatDateString(reminders.time);
      await ctx.reply(
        messageParams('allDataReminders', {
          reminder: {
            reminders_id: reminders.reminders_id,
            title: reminders.name,
            description: reminders.description,
            date: date,
            time: time,
          },
        }),
        {
          reply_markup: this.ik.keyboardDeleteClose(
            'last_reminders',
            reminders.reminders_id,
          ),
          parse_mode: 'HTML',
        },
      );
    });
    this.bot.callbackQuery(/^last_reminders-delete=.+$/, async (ctx) => {
      const user = this.users.get(ctx.chat.id);
      if (!(await this.checkFutureRemindersSlider(ctx, user))) return;
      const RID = ctx.update.callback_query.data.split('=')[1];
      await this.db.deleteRemindersUser(user.id_VL, Number(RID));
      ctx.deleteMessage();
      ctx.answerCallbackQuery('Напоминание удалено!');
      console.log(RID);
    });
    this.bot.callbackQuery('reminders-bMonth', async (ctx) => {
      const user = this.users.get(ctx.from.id);
      if (!this.checkExistUserData(ctx, user)) return;
      if (!user || !user.reminders || !user.reminders.createReminder) {
        ctx.answerCallbackQuery(
          'Данные потеряны. Пожалуйста повторите попытку!',
        );
        return ctx.deleteMessage();
      }
      if (!user.inputs || !user.inputs.date) {
        this.setInpDateUser(ctx.from.id);
      }
      if (user.inputs.date.month == 0) {
        user.inputs.date.month = 11;
        user.inputs.date.year--;
      } else user.inputs.date.month--;
      const text = messageParams('inpDateReminders', {
        inpDateReminders: {
          day: user.inputs.date.day ?? 'дд',
          month: months[user.inputs.date.month].num ?? 'мм',
          year: user.inputs.date.year ?? 'гггг',
          hour: user.inputs.date.hour ?? 'чч',
          minute: user.inputs.date.minute ?? 'мм',
        },
      });
      ctx.editMessageText(text, {
        reply_markup: this.ik.mergeStepKeyboard(
          'reminders',
          3,
          user.inputs.date.day ?? 0,
          months[user.inputs.date.month],
          user.inputs.date.year,
        ),
      });
    });
    this.bot.callbackQuery('reminders-nMonth', async (ctx) => {
      const user = this.users.get(ctx.from.id);
      if (!this.checkExistUserData(ctx, user)) return;
      if (user.inputs.date.month == 11) {
        user.inputs.date.month = 0;
        user.inputs.date.year++;
      } else user.inputs.date.month++;
      if (user.inputs.date.day > months[user.inputs.date.month].countDay)
        user.inputs.date.day = months[user.inputs.date.month].countDay;
      const text = messageParams('inpDateReminders', {
        inpDateReminders: {
          day: user.inputs.date.day ?? 'дд',
          month: months[user.inputs.date.month].num ?? 'мм',
          year: user.inputs.date.year ?? 'гггг',
          hour: user.inputs.date.hour ?? 'чч',
          minute: user.inputs.date.minute ?? 'мм',
        },
      });
      ctx.editMessageText(text, {
        reply_markup: this.ik.mergeStepKeyboard(
          'reminders',
          3,
          user.inputs.date.day ?? 0,
          months[user.inputs.date.month],
          user.inputs.date.year,
        ),
      });
    });
    this.bot.callbackQuery('reminders-nYear', async (ctx) => {
      const user = this.users.get(ctx.from.id);
      if (!this.checkExistUserData(ctx, user)) return;
      user.inputs.date.year++;
      console.log(
        user.inputs.date.month,
        months[user.inputs.date.month],
        user.inputs.date.month,
      );
      const text = messageParams('inpDateReminders', {
        inpDateReminders: {
          day: user.inputs.date.day ?? 'дд',
          month: months[user.inputs.date.month].num ?? 'мм',
          year: user.inputs.date.year ?? 'гггг',
          hour: user.inputs.date.hour ?? 'чч',
          minute: user.inputs.date.minute ?? 'мм',
        },
      });
      ctx.editMessageText(text, {
        reply_markup: this.ik.mergeStepKeyboard(
          'reminders',
          3,
          user.inputs.date.day ?? 0,
          months[user.inputs.date.month],
          user.inputs.date.year,
        ),
      });
    });
    this.bot.callbackQuery('reminders-bYear', async (ctx) => {
      const user = this.users.get(ctx.from.id);
      if (!this.checkExistUserData(ctx, user)) return;
      user.inputs.date.year--;
      console.log(
        user.inputs.date.month,
        months[user.inputs.date.month],
        user.inputs.date.month,
      );
      const text = messageParams('inpDateReminders', {
        inpDateReminders: {
          day: user.inputs.date.day ?? 'дд',
          month: months[user.inputs.date.month].num ?? 'мм',
          year: user.inputs.date.year ?? 'гггг',
          hour: user.inputs.date.hour ?? 'чч',
          minute: user.inputs.date.minute ?? 'мм',
        },
      });
      ctx.editMessageText(text, {
        reply_markup: this.ik.mergeStepKeyboard(
          'reminders',
          3,
          user.inputs.date.day ?? 0,
          months[user.inputs.date.month],
          user.inputs.date.year,
        ),
      });
    });
    this.bot.callbackQuery('reminders-cancel', (ctx) => {
      ctx.deleteMessage();
    });
    this.bot.callbackQuery('reminders-kh-next-minute', (ctx) => {
      const user = this.users.get(ctx.from.id);
      if (!this.checkExistData(ctx, user)) return;
      if (user.inputs.date.formatTime == 'PM')
        user.inputs.date.hour = user.inputs.date.hour + 12;
      user.inputs.date.minute = 30;
      const text = messageParams('inpDateReminders', {
        inpDateReminders: {
          day: user.inputs.date.day ?? 'дд',
          month: months[user.inputs.date.month].num ?? 'мм',
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
        }),
      });
    });
    this.bot.callbackQuery('reminders-kmp-save', (ctx) => {
      const user = this.users.get(ctx.from.id);
      if (!this.checkExistData(ctx, user)) return;
      const { day, month, year, hour, minute } = user.inputs.date;
      const date = `${day < 10 ? '0' + day : day}.${month + 1 < 10 ? '0' + (month + 1) : month + 1}.${year}`;
      const time = `${hour == 24 ? '00' : hour}:${minute < 10 ? '0' + minute : minute}`;
      user.reminders.createReminder.date = date;
      user.reminders.createReminder.time = time;
      ctx.editMessageText(
        messageParams('allDataReminders', {
          reminder: {
            title: user.reminders.createReminder.title,
            description: user.reminders.createReminder.description,
            date: user.reminders.createReminder.date,
            time: user.reminders.createReminder.time,
          },
        }),
        {
          parse_mode: 'HTML',
          reply_markup: this.ik.saveKeyboard('reminders'),
        },
      );
    });
    this.bot.callbackQuery('reminders-save', async (ctx) => {
      const user = this.users.get(ctx.from.id);
      if (!this.checkExistData(ctx, user)) return;
      ctx.deleteMessage();
      await this.db.addRemindersUser(user.id_VL, user.reminders.createReminder);
      ctx.answerCallbackQuery('Напоминание создано!');
    });
    //
    this.bot.callbackQuery('reminders-slider-back', async (ctx) => {
      const user = this.users.get(ctx.chat.id);
      if (!(await this.checkAllRemindersSlider(ctx, user))) return 0;
      if (!(await this.delIfNotSlider(ctx))) return;
      const oldI = user.slider.thisI;
      if (user.slider.thisI != 0) {
        user.slider.thisI = user.slider.thisI - 1;
      } else {
        user.slider.thisI = user.slider.count - 1;
      }
      if (oldI === user.slider.thisI) return;
      ctx
        .editMessageText(
          messageParams('allDataReminders', {
            reminder: user.reminders.all[user.slider.thisI],
          }),
          {
            parse_mode: 'HTML',
            reply_markup: this.ik.boxSlider(
              'reminders',
              user.reminders.all[user.slider.thisI].reminders_id,
              {
                view: false,
                delete: true,
              },
            ),
          },
        )
        .catch((e) => console.log(e));
    });
    this.bot.callbackQuery('reminders-slider-next', async (ctx) => {
      const user = this.users.get(ctx.chat.id);
      if (!(await this.checkAllRemindersSlider(ctx, user))) return;
      if (!(await this.delIfNotSlider(ctx))) return;
      const oldI = user.slider.thisI;
      if (user.slider.thisI != user.slider.count - 1) {
        user.slider.thisI = user.slider.thisI + 1;
      } else {
        user.slider.thisI = 0;
      }
      if (oldI === user.slider.thisI) return;
      ctx
        .editMessageText(
          messageParams('allDataReminders', {
            reminder: user.reminders.all[user.slider.thisI],
          }),
          {
            parse_mode: 'HTML',
            reply_markup: this.ik.boxSlider(
              'reminders',
              user.reminders.all[user.slider.thisI].reminders_id,
              {
                view: false,
                delete: true,
              },
            ),
          },
        )
        .catch((e) => console.log(e));
    });
    //
    this.bot.callbackQuery('reminders-past-slider-back', async (ctx) => {
      const user = this.users.get(ctx.chat.id);
      if (!(await this.checkPastRemindersSlider(ctx, user))) return 0;
      if (!(await this.delIfNotSlider(ctx))) return;
      const oldI = user.slider.thisI;
      if (user.slider.thisI != 0) {
        user.slider.thisI = user.slider.thisI - 1;
      } else {
        user.slider.thisI = user.slider.count - 1;
      }
      if (oldI === user.slider.thisI) return;
      ctx
        .editMessageText(
          messageParams('allDataReminders', {
            reminder: user.reminders.all[user.slider.thisI],
          }),
          {
            parse_mode: 'HTML',
            reply_markup: this.ik.boxSlider(
              'reminders',
              user.reminders.all[user.slider.thisI].reminders_id,
              {
                view: false,
                delete: true,
              },
            ),
          },
        )
        .catch((e) => console.log(e));
    });
    this.bot.callbackQuery('reminders-past-slider-next', async (ctx) => {
      const user = this.users.get(ctx.chat.id);
      if (!(await this.checkPastRemindersSlider(ctx, user))) return;
      if (!(await this.delIfNotSlider(ctx))) return;
      const oldI = user.slider.thisI;
      if (user.slider.thisI != user.slider.count - 1) {
        user.slider.thisI = user.slider.thisI + 1;
      } else {
        user.slider.thisI = 0;
      }
      if (oldI === user.slider.thisI) return;
      ctx
        .editMessageText(
          messageParams('allDataReminders', {
            reminder: user.reminders.all[user.slider.thisI],
          }),
          {
            parse_mode: 'HTML',
            reply_markup: this.ik.boxSlider(
              'reminders',
              user.reminders.all[user.slider.thisI].reminders_id,
              {
                view: false,
                delete: true,
              },
            ),
          },
        )
        .catch((e) => console.log(e));
    });
    //
    this.bot.callbackQuery('reminders-future-slider-back', async (ctx) => {
      const user = this.users.get(ctx.chat.id);
      if (!(await this.checkFutureRemindersSlider(ctx, user))) return 0;
      if (!(await this.delIfNotSlider(ctx))) return;
      const oldI = user.slider.thisI;
      if (user.slider.thisI != 0) {
        user.slider.thisI = user.slider.thisI - 1;
      } else {
        user.slider.thisI = user.slider.count - 1;
      }
      if (oldI === user.slider.thisI) return;
      ctx
        .editMessageText(
          messageParams('allDataReminders', {
            reminder: user.reminders.all[user.slider.thisI],
          }),
          {
            parse_mode: 'HTML',
            reply_markup: this.ik.boxSlider(
              'reminders',
              user.reminders.all[user.slider.thisI].reminders_id,
              {
                view: false,
                delete: true,
              },
            ),
          },
        )
        .catch((e) => console.log(e));
    });
    this.bot.callbackQuery('reminders-future-slider-next', async (ctx) => {
      const user = this.users.get(ctx.chat.id);
      if (!(await this.checkFutureRemindersSlider(ctx, user))) return;
      if (!(await this.delIfNotSlider(ctx))) return;
      const oldI = user.slider.thisI;
      if (user.slider.thisI != user.slider.count - 1) {
        user.slider.thisI = user.slider.thisI + 1;
      } else {
        user.slider.thisI = 0;
      }
      if (oldI === user.slider.thisI) return;
      ctx
        .editMessageText(
          messageParams('allDataReminders', {
            reminder: user.reminders.all[user.slider.thisI],
          }),
          {
            parse_mode: 'HTML',
            reply_markup: this.ik.boxSlider(
              'reminders',
              user.reminders.all[user.slider.thisI].reminders_id,
              {
                view: false,
                delete: true,
              },
            ),
          },
        )
        .catch((e) => console.log(e));
    });
    this.bot.callbackQuery(
      [
        /^reminders-future-delete=.+$/,
        /^reminders-past-delete=.+$/,
        /^reminders-delete=.+$/,
      ],
      async (ctx) => {
        const user = this.users.get(ctx.chat.id);
        if (!(await this.checkFutureRemindersSlider(ctx, user))) return;
        if (!(await this.delIfNotSlider(ctx))) return;
        const RID = ctx.update.callback_query.data.split('=')[1];
        await this.db.deleteRemindersUser(user.id_VL, Number(RID));
        user.reminders.all[user.slider.thisI];
        for (let i = user.slider.thisI; i < user.slider.count; i++) {
          user.reminders.all[i] = user.reminders.all[i + 1];
        }
        user.reminders.all[user.slider.count - 1] = undefined;
        user.slider.count = user.slider.count - 1;
        if (user.slider.thisI - 1 >= 0) {
          user.slider.thisI = user.slider.thisI - 1;
        } else {
          user.slider.thisI = user.slider.count;
        }
        if (user.slider.count == 0) return await ctx.deleteMessage();
        ctx
          .editMessageText(
            messageParams('allDataReminders', {
              reminder: user.reminders.all[user.slider.thisI],
            }),
            {
              parse_mode: 'HTML',
              reply_markup: this.ik.boxSlider(
                'reminders',
                user.reminders.all[user.slider.thisI].reminders_id,
                {
                  view: false,
                  delete: true,
                },
              ),
            },
          )
          .catch((e) => console.log(e));
      },
    );
    this.bot.callbackQuery(/^reminders-kmp=.+$/, (ctx) => {
      const user = this.users.get(ctx.from.id);
      if (!this.checkExistData(ctx, user)) return;
      const num = ctx.match[0].split('=')[1];
      user.inputs.date.minute + Number(num) > 59
        ? (user.inputs.date.minute = 59)
        : (user.inputs.date.minute = user.inputs.date.minute + Number(num));
      console.log(user.inputs.date.minute, Number(num));
      const text = messageParams('inpDateReminders', {
        inpDateReminders: {
          day: user.inputs.date.day ?? 'дд',
          month: months[user.inputs.date.month].num ?? 'мм',
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
          }),
        })
        .catch(() => {});
    });
    this.bot.callbackQuery(/^reminders-kmm=.+$/, (ctx) => {
      const user = this.users.get(ctx.from.id);
      if (!this.checkExistData(ctx, user)) return;
      const num = ctx.match[0].split('=')[1];
      user.inputs.date.minute - Number(num) < 0
        ? (user.inputs.date.minute = 0)
        : (user.inputs.date.minute = user.inputs.date.minute - Number(num));
      console.log(user.inputs.date.minute, Number(num));
      const text = messageParams('inpDateReminders', {
        inpDateReminders: {
          day: user.inputs.date.day ?? 'дд',
          month: months[user.inputs.date.month].num ?? 'мм',
          year: user.inputs.date.year ?? 'гггг',
          hour: user.inputs.date.hour ?? 'чч',
          minute:
            user.inputs.date.minute < 10
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
          }),
          parse_mode: 'HTML',
        })
        .catch(() => {});
    });
    this.bot.callbackQuery([/^.+-kh=AM$/, /^.+-kh=PM$/], (ctx) => {
      const user = this.users.get(ctx.from.id);
      if (!this.checkExistData(ctx, user)) return;
      const format = ctx.match[0].split('=')[1];
      ctx.answerCallbackQuery(format);
      if (format == user.inputs.date.formatTime) return;
      user.inputs.date.formatTime = format == 'AM' ? 'AM' : 'PM';
      const text = messageParams('inpDateReminders', {
        inpDateReminders: {
          day: user.inputs.date.day ?? 'дд',
          month: months[user.inputs.date.month].num ?? 'мм',
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
        }),
      });
    });
    this.bot.callbackQuery(/^reminders-kh=.+$/, (ctx) => {
      const user = this.users.get(ctx.from.id);
      if (!this.checkExistData(ctx, user)) return;
      const hour = ctx.match[0].split('=')[1];
      if (hour == 'true')
        return ctx.answerCallbackQuery('Вы уже выбрали данный час');
      // console.log(day);
      user.inputs.date.hour = Number(hour);
      const text = messageParams('inpDateReminders', {
        inpDateReminders: {
          day: user.inputs.date.day ?? 'дд',
          month: months[user.inputs.date.month].num ?? 'мм',
          year: user.inputs.date.year ?? 'гггг',
          hour:
            user.inputs.date.formatTime == 'PM'
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
        }),
      });
    });
    this.bot.callbackQuery(/^.+-kd-next-hour$/, (ctx) => {
      const user = this.users.get(ctx.from.id);
      if (!this.checkExistData(ctx, user)) return;
      const text = messageParams('inpDateReminders', {
        inpDateReminders: {
          day: user.inputs.date.day ?? 'дд',
          month: months[user.inputs.date.month].num ?? 'мм',
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
        }),
      });
    });

    this.bot.callbackQuery(/^.+-kd=false$/, (ctx) => {
      ctx.answerCallbackQuery('Данное число в этом месяце не доступно');
    });
    this.bot.callbackQuery(/^.+-kd=true$/, (ctx) => {
      console.log('Данное число уже выбрано');
      ctx.answerCallbackQuery('Данное число уже выбрано');
    });
    this.bot.callbackQuery(/^reminders-kd.+$/, (ctx) => {
      const user = this.users.get(ctx.from.id);
      if (!this.checkExistData(ctx, user)) return;
      const number = ctx.match[0].split('=')[1];
      console.log(number);
      user.inputs.date.day = Number(number);
      const text = messageParams('inpDateReminders', {
        inpDateReminders: {
          day: user.inputs.date.day ?? 'дд',
          month: months[user.inputs.date.month].num ?? 'мм',
          year: user.inputs.date.year ?? 'гггг',
          hour: user.inputs.date.hour ?? 'чч',
          minute: user.inputs.date.minute ?? 'мм',
        },
      });
      ctx.editMessageText(text, {
        reply_markup: this.ik.mergeStepKeyboard(
          'reminders',
          3,
          user.inputs.date.day ?? 0,
          months[user.inputs.date.month],
          user.inputs.date.year,
        ),
      });
    });
    this.bot.callbackQuery(/^disable_login-.+$/, (ctx) => {
      const callbackData = ctx.match[0];
      const code = callbackData.split('-')[1];
      const data = this.cache.getLoginTG(code);
      if (data == undefined)
        return ctx.answerCallbackQuery('Ваша авторизация просрочена!');
      this.cache.setLoginTG(code, { bool: false }, 2);
      return ctx.answerCallbackQuery('Авторизация отклонена!');
    });
    this.bot.callbackQuery(/^accept_login-.+$/, async (ctx) => {
      const callbackData = ctx.match[0];
      const code = callbackData.split('-')[1];
      const data = this.cache.getLoginTG(code);
      if (data == undefined)
        return ctx.answerCallbackQuery(
          'Ваша авторизация просрочена, повторите попытку',
        );
      const rand = new Random(15);
      const str = await rand.generateString();
      const from = ctx.update.callback_query.from;
      const id = await this.db.getUserIdByTelegramId(from.id);
      await this.db.createSession(str, id);
      this.cache.setLoginTG(code, { bool: true, session: str }, 2);
      return ctx.answerCallbackQuery('Успешная авторизация!');
    });
    this.bot.callbackQuery('create_reminders', async (ctx) => {
      ctx.deleteMessage();
      const mess = await ctx.reply(message.remindersCreateStepOne, {
        reply_markup: this.ik.margeStepCancel({
          tag: 'reminders',
          step: 1,
          boolCancel: true,
        }),
        parse_mode: 'HTML',
      });
      this.addListMessage(ctx.from.id, mess.message_id, {
        code: 'oneStepCreateReminders',
      });
    });
    this.bot.callbackQuery(/^.+-close$/, (ctx) => {
      const data = ctx.update.callback_query.data;
      if (
        data == 'reminders-future-close' ||
        data == 'reminders-past-close' ||
        data == 'reminders-close'
      )
        if (
          this.editMess.has(ctx.from.id) &&
          this.editMess.get(ctx.from.id).has('slider')
        )
          this.editMess.get(ctx.from.id).delete('slider');

      ctx.deleteMessage().catch(() => {});
    });
    this.bot.catch((e) => {
      console.log(e);
    });
    //
    setInterval(async () => {
      const list = await this.db.getThisReminders();
      if (list.length > 0) {
        for (const item of list) {
          if (!item.user.telegram || item.user.telegram.length != 1) return;
          this.bot.api.sendMessage(
            Number(item.user.telegram[0].user_tg_id),
            `Уведомление!\nВам пришло напоминаие: ${item.name}\nОписание: ${item.description}`,
          );
        }
      }
    }, 60000);
  }
  private addListMessage(id: number, key: number, mess: Mess) {
    if (!this.reactionMess.has(id)) {
      this.reactionMess.set(id, new Map<number, Mess>());
    }
    this.reactionMess.get(id)?.set(key, mess);
  }
  private addListEditMessage(id: number, key: string, mess_id: number) {
    if (!this.editMess.has(id)) {
      this.editMess.set(id, new Map<string, number>());
    }
    this.editMess.get(id)?.set(key, mess_id);
  }
  private getItemListMess(id: number, key: number) {
    if (!this.reactionMess.has(id)) return false;
    if (!this.reactionMess.get(id).has(key)) return false;
    return this.reactionMess.get(id).get(key);
  }
  private getItemListEditMess(id: number, key: string) {
    if (!this.editMess.has(id)) return false;
    if (!this.editMess.get(id).has(key)) return false;
    return this.editMess.get(id).get(key);
  }
  private setInpDateUser(id: number) {
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
  private checkExistData(ctx, user) {
    if (!user || !user.reminders || !user.reminders.createReminder) {
      ctx.answerCallbackQuery(
        'Данные потеряны. Пожалуйста повторите попытку!',
        {
          show_alert: true,
        },
      );
      ctx.deleteMessage();
      return false;
    }
    if (!user.inputs || !user.inputs.date) {
      ctx.answerCallbackQuery(
        'Данные потеряны. Пожалуйста повторите попытку!',
        {
          show_alert: true,
        },
      );
      ctx.deleteMessage();
      return false;
    }
    return true;
  }
  private checkExistUserData(ctx, user) {
    if (!user || !user.reminders || !user.reminders.createReminder) {
      ctx.answerCallbackQuery(
        'Данные потеряны. Пожалуйста повторите попытку!',
        {
          show_alert: true,
        },
      );
      ctx.deleteMessage();
      return false;
    }
    if (!user.inputs || !user.inputs.date) {
      this.setInpDateUser(ctx.from.id);
    }
    return true;
  }
  private async checkAllRemindersSlider(ctx, user) {
    if (!user) {
      ctx.answerCallbackQuery('Ваши данные потеряны');
      ctx.deleteMessage();
      return false;
    }
    if (!user.reminders || !user.reminders.all) {
      user.reminders = {};
      user.reminders.all = [];
      const reminders = await this.db.getAllReminders(user.id_VL);
      console.log(reminders);
      for (const item of reminders) {
        const { date, time } = this.formatDateString(item.time);
        user.reminders.all.push({
          reminders_id: item.reminders_id,
          title: item.name,
          description: item.description,
          date: date,
          time: time,
        });
      }
    }
    if (user.reminders.all.length == 0) {
      ctx.answerCallbackQuery('У вас нету заметок в данной категории');
      return false;
    }
    if (!user.slider)
      user.slider = { thisI: 0, count: user.reminders.all.length };
    return true;
  }
  private async checkPastRemindersSlider(ctx, user) {
    if (!user) {
      ctx.answerCallbackQuery('Ваши данные потеряны');
      ctx.deleteMessage();
      return false;
    }
    if (!user.reminders || !user.reminders.all) {
      user.reminders = {};
      user.reminders.all = [];
      const reminders = await this.db.getPastReminders(user.id_VL);
      for (const item of reminders) {
        const { date, time } = this.formatDateString(item.time);
        user.reminders.all.push({
          reminders_id: item.reminders_id,
          title: item.name,
          description: item.description,
          date: date,
          time: time,
        });
      }
    }
    if (user.reminders.all.length == 0) {
      ctx.answerCallbackQuery('У вас нету заметок в данной категории');
      return false;
    }
    if (!user.slider)
      user.slider = { thisI: 0, count: user.reminders.all.length };
    return true;
  }
  private async checkFutureRemindersSlider(ctx, user) {
    if (!user) {
      ctx.answerCallbackQuery('Ваши данные потеряны');
      ctx.deleteMessage();
      return false;
    }
    if (!user.reminders || !user.reminders.all) {
      user.reminders = {};
      user.reminders.all = [];
      const reminders = await this.db.getFutureReminders(user.id_VL);
      for (const item of reminders) {
        const { date, time } = this.formatDateString(item.time);
        user.reminders.all.push({
          reminders_id: item.reminders_id,
          title: item.name,
          description: item.description,
          date: date,
          time: time,
        });
      }
    }
    if (user.reminders.all.length == 0) {
      ctx.answerCallbackQuery('У вас нету заметок в данной категории');
      return false;
    }
    if (!user.slider)
      user.slider = { thisI: 0, count: user.reminders.all.length };
    return true;
  }
  private delSlider(ctx) {
    const msgSliderOld = this.getItemListEditMess(ctx.from.id, 'slider');
    if (!msgSliderOld) return;
    this.bot.api.deleteMessage(ctx.chat.id, msgSliderOld);
  }
  private delIfNotSlider(ctx) {
    const msgSliderOld = this.getItemListEditMess(ctx.from.id, 'slider');
    if (
      !msgSliderOld ||
      msgSliderOld != ctx.update.callback_query.message.message_id
    ) {
      this.bot.api.deleteMessage(
        ctx.chat.id,
        ctx.update.callback_query.message.message_id,
      );
      ctx.answerCallbackQuery(
        'Данный слайдер устарел, пожалуйста откройте новый',
      );
      return false;
    }
    return true;
  }
  private formatDateString(date: Date): { date: string; time: string } {
    const day = String(date.getUTCDate()).padStart(2, '0'); // Получаем день
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Получаем месяц (месяцы начинаются с 0)
    const year = date.getUTCFullYear(); // Получаем год
    const hours = String(date.getUTCHours()).padStart(2, '0'); // Получаем часы
    const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // Получаем минуты
    return { date: `${day}.${month}.${year}`, time: `${hours}:${minutes}` };
  }
}
