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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const hash_service_1 = require("../hash/hash.service");
let DatabaseService = class DatabaseService {
    constructor(client) {
        this.allUsers = async () => {
            return await this.p.users.findMany();
        };
        this.returnPasswordByNickname = async (nickname) => {
            const result = await this.p.users.findUnique({
                where: { nickname: nickname },
                select: { user_id: true, password_hash: true },
            });
            return result;
        };
        this.returnPasswordByMail = async (mail) => {
            const result = await this.p.users.findUnique({
                where: { mail: mail },
                select: { user_id: true, password_hash: true },
            });
            return result;
        };
        this.newUser = async (user) => {
            try {
                const user_id = await this.p.users.create({
                    data: {
                        last_name: user.last_name,
                        first_name: user.first_name,
                        patronomic: user.patronomic,
                        number: user.number,
                        mail: user.mail,
                        nickname: user.nickname,
                        gender: user.gender,
                        date_birthday: user.date_birthday,
                        password_hash: user.password,
                    },
                    select: { user_id: true },
                });
                return {
                    statusCode: common_1.HttpStatus.CREATED,
                    message: user_id.user_id.toString(),
                };
            }
            catch (e) {
                if (e.code && e.code === 'P2002') {
                    const fields = e.meta?.target;
                    return {
                        statusCode: common_1.HttpStatus.CONFLICT,
                        error: `Duplicate fields: ${fields.join(', ')}`,
                    };
                }
                return {
                    statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
                    error: 'An unexpected error',
                };
            }
        };
        this.createSession = async (session, userId) => {
            const currentTime = new Date();
            const futureTime = new Date(currentTime.setHours(currentTime.getHours() + 3));
            await this.p.sessions.create({
                data: {
                    session_id: session,
                    user_id: userId,
                    session_create: futureTime,
                },
            });
        };
        this.returnUserIdByMail = async (mail) => {
            const userId = await this.p.users.findUnique({
                where: { mail: mail },
                select: { user_id: true },
            });
            if (userId)
                return userId.user_id;
            return null;
        };
        this.addCodeMail = async (userId, key) => {
            const date = new Date();
            const hours = date.getHours() + 3;
            date.setHours(hours);
            console.log(date);
            await this.p.code.upsert({
                where: { user_id: userId },
                update: { key: key, date_create: date },
                create: {
                    user_id: userId,
                    key: key,
                },
            });
        };
        this.checkMail = async (mail) => {
            return await this.p.users.count({ where: { mail: mail } });
        };
        this.checkCodeUser = async (userId, code) => {
            const r = await this.p.code.findUnique({
                where: { user_id: userId, key: code },
                select: {
                    date_create: true,
                },
            });
            if (r)
                return r.date_create;
            return null;
        };
        this.updatePassword = async (userId, password_hash) => {
            await this.p.users.update({
                where: { user_id: userId },
                data: { password_hash: password_hash },
            });
        };
        this.checkRegisterNickname = async (nick) => {
            return await this.p.users.count({ where: { nickname: nick } });
        };
        this.checkRegisterMail = async (mail) => {
            return await this.p.users.count({ where: { mail: mail } });
        };
        this.checkRegisterPhome = async (phone) => {
            return await this.p.users.count({ where: { number: phone } });
        };
        this.getIdBySession = async (session) => {
            const id = await this.p.sessions.findUnique({
                where: { session_id: session },
            });
            if (id)
                return id.user_id;
            return null;
        };
        this.checkUserTgById = async (id) => {
            return (await this.p.telegram_Users.count({ where: { user_id: id } })) != 0
                ? true
                : false;
        };
        this.checkTelegramVerifyById = async (id) => {
            return (await this.p.telegram_Users.count({ where: { user_id: id } })) != 0
                ? true
                : false;
        };
        this.addTelegramVerify = async (id, data) => {
            return await this.p.telegram_Users.create({
                data: {
                    user_id: id,
                    user_tg_id: data.id,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    username: data.username,
                    photo_max_url: data.photo_max_url,
                    photo_medium_url: data.photo_medium_url,
                    photo_mini_url: data.photo_mini_url,
                    bio: data.bio,
                },
            });
        };
        this.getUserIdByTelegramId = async (id) => {
            const userId = await this.p.telegram_Users.findUnique({
                where: { user_tg_id: id },
                select: { user_id: true },
            });
            if (!userId)
                return false;
            return userId.user_id;
        };
        this.getUserIdBySession = async (session) => {
            const user_id = await this.p.sessions.findUnique({
                where: { session_id: session },
                select: { user_id: true },
            });
            if (!user_id)
                return false;
            return user_id.user_id;
        };
        this.getAllUserNotes = async (userId) => {
            return await this.p.notes.findMany({
                where: { user_id: userId },
                select: { notes_id: true, name: true, description: true },
            });
        };
        this.postNoteUser = async (userId, name, description) => {
            await this.p.notes.create({
                data: { user_id: userId, name: name, description: description },
            });
        };
        this.deleteNoteUser = async (id) => {
            await this.p.notes.delete({ where: { notes_id: id } });
        };
        this.getUserInfo = async (id) => {
            return await this.p.users.findUnique({
                where: { user_id: id },
                select: {
                    last_name: true,
                    first_name: true,
                    patronomic: true,
                    number: true,
                    mail: true,
                    nickname: true,
                    gender: true,
                    date_birthday: true,
                },
            });
        };
        this.getAllRemindersCount = async (id) => {
            return await this.p.reminders.count({
                where: { user_id: id },
            });
        };
        this.getAllReminders = async (id) => {
            return await this.p.reminders.findMany({
                where: { user_id: id },
            });
        };
        this.getPastRemindersCount = async (id) => {
            return await this.p.reminders.count({
                where: {
                    user_id: id,
                    time: {
                        lt: new Date(),
                    },
                },
            });
        };
        this.getPastReminders = async (id) => {
            return await this.p.reminders.findMany({
                where: {
                    user_id: id,
                    time: {
                        lt: new Date(),
                    },
                },
            });
        };
        this.getFutureRemindersCount = async (id) => {
            return await this.p.reminders.count({
                where: {
                    user_id: id,
                    time: {
                        gt: new Date(),
                    },
                },
            });
        };
        this.getFutureReminders = async (id) => {
            return await this.p.reminders.findMany({
                where: {
                    user_id: id,
                    time: {
                        gt: new Date(),
                    },
                },
            });
        };
        this.addRemindersUser = async (id, params) => {
            const date = params.date.split('.');
            const time = params.time.split(':');
            const formattedDate = new Date(Date.UTC(parseInt(date[2]), parseInt(date[1]) - 1, parseInt(date[0]), parseInt(time[0]), parseInt(time[1])));
            await this.p.reminders.create({
                data: {
                    user_id: id,
                    name: params.title,
                    description: params.description,
                    time: formattedDate,
                },
            });
        };
        this.getFirstReminders = async (id) => {
            return await this.p.reminders.findFirst({
                where: {
                    user_id: id,
                    time: {
                        gt: new Date(),
                    },
                },
                orderBy: {
                    time: 'asc',
                },
            });
        };
        this.deleteRemindersUser = async (userId, reminderId) => {
            await this.p.reminders.delete({
                where: { user_id: userId, reminders_id: reminderId },
            });
        };
        this.getThisReminders = async () => {
            const now = new Date();
            const startOfMinute = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 3, now.getMinutes(), 0, 0);
            const endOfMinute = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 3, now.getMinutes(), 59, 999);
            return await this.p.reminders.findMany({
                where: {
                    time: {
                        gte: startOfMinute,
                        lte: endOfMinute,
                    },
                },
                include: {
                    user: {
                        include: {
                            telegram: {
                                select: {
                                    user_tg_id: true,
                                },
                            },
                        },
                    },
                },
            });
        };
        this.p = client;
        this.h = hash_service_1.HashService;
    }
    formatDateString(date) {
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const second = String(date.getUTCSeconds()).padStart(2, '0');
        return {
            date: `${day}.${month}.${year}`,
            time: `${hours}:${minutes}:${second}`,
        };
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DatabaseService);
//# sourceMappingURL=database.service.js.map