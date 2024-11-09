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
exports.AuthDatabaseService = void 0;
const common_1 = require("@nestjs/common");
const hash_service_1 = require("../hash/hash.service");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthDatabaseService = class AuthDatabaseService {
    constructor(client) {
        this.returnPasswordByMail = async (mail) => {
            const result = await this.p.users.findUnique({
                where: { mail: mail },
                select: { user_id: true, password_hash: true },
            });
            return result;
        };
        this.newUser = async (data) => {
            try {
                const initials = data.initials.split(' ');
                const userCreate = await this.p.users.create({
                    data: {
                        last_name: initials[0],
                        first_name: initials[1],
                        patronomic: initials[2] === undefined ? null : initials[2],
                        mail: data.email,
                        nickname: data.nickname,
                        gender: data.gender,
                        date_birthday: new Date(data.date),
                        password_hash: data.password,
                    },
                    select: { user_id: true, role: { select: { role: true } } },
                });
                console.log(userCreate);
                const payload = {
                    id: userCreate.user_id,
                    role: userCreate.role.role,
                };
                return {
                    accept: {
                        data: {
                            payload: payload,
                        },
                        message: 'Успешная авторизация',
                    },
                };
            }
            catch (e) {
                console.log(e);
                if (e.code && e.code === 'P2002') {
                    const fields = e.meta?.target;
                    return {
                        error: {
                            message: `Данные из следующих полей уже зарегистрированы: ${fields.join(', ')}`,
                        },
                    };
                }
                return {
                    error: { message: 'An unexpected error' },
                };
            }
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
        this.p = client;
        this.h = hash_service_1.HashService;
    }
};
exports.AuthDatabaseService = AuthDatabaseService;
exports.AuthDatabaseService = AuthDatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthDatabaseService);
//# sourceMappingURL=auth.service.js.map