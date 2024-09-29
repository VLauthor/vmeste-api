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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const validator_service_1 = require("../validator/validator.service");
const hash_service_1 = require("../hash/hash.service");
const tokens_service_1 = require("../tokens/tokens.service");
const class_1 = require("../objects/class");
const mail_service_1 = require("../mail/mail.service");
let AuthService = class AuthService {
    constructor(d, v, h, m, tokens) {
        this.d = d;
        this.v = v;
        this.h = h;
        this.m = m;
        this.tokens = tokens;
        this.loginUser = async (res, dto) => {
            const { login, password } = dto;
            if (!this.v.mail(login))
                throw new common_1.BadRequestException('mail is not valid');
            const resultMail = await this.d.returnPasswordByMail(login);
            if (resultMail) {
                if (await this.h.checkHash(password, resultMail.password_hash)) {
                    console.log('xd');
                    const refreshToken = this.tokens.createRefreshToken({
                        id: resultMail.user_id,
                    });
                    const accessToken = this.tokens.createAccessToken({
                        id: resultMail.user_id,
                        role: resultMail.role,
                    });
                    res.cookie('accessToken', accessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'Strict',
                        maxAge: 15 * 60 * 1000,
                    });
                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'Strict',
                        maxAge: 14 * 24 * 60 * 60 * 1000,
                    });
                    const json = {
                        statusCode: common_1.HttpStatus.OK,
                        message: 'Успешная авторизация',
                    };
                    return res.status(common_1.HttpStatus.OK).json(json);
                }
                throw new common_1.BadRequestException('Неверный пароль. Пожалуйста проверьте его и повтоорите попытку.');
            }
            throw new common_1.BadRequestException('Не удалось провести авторизацию, повторите Ваш запрос позже!ы');
        };
        this.signInUser = async (res, dto) => {
            const initials = dto.initials.split(' ');
            if (initials.length !== 2 && initials.length !== 3)
                throw new common_1.BadRequestException('Введены не все инициалы, пожалуйста проверьте его');
            if (!this.v.nickname(dto.nickname))
                throw new common_1.BadRequestException('Введен не кореектный никнейм, пожалуйста проверьте его.');
            if (!this.v.password(dto.password))
                throw new common_1.BadRequestException('Ваш пароль слишкм ленкий, пожалуйста усложните его.');
            if (!this.v.date(dto.date))
                throw new common_1.BadRequestException('Введена не кореектный дата рождения, пожалуйста проверьте её.');
            dto.password = await this.h.createHash(dto.password);
            const result = await this.d.newUser(dto);
            if (result.error)
                throw new common_1.BadRequestException(result.error.message);
            const refreshToken = this.tokens.createRefreshToken({
                id: result.accept.data.payload.id,
            });
            const accessToken = this.tokens.createAccessToken(result.accept.data.payload);
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 15 * 60 * 1000,
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 14 * 24 * 60 * 60 * 1000,
            });
            const json = {
                statusCode: common_1.HttpStatus.OK,
                message: 'Успешная регистрация',
            };
            return res.status(common_1.HttpStatus.OK).json(json);
        };
        this.createCode = async (res, dto) => {
            const randomCode = new class_1.Random(5);
            const userId = await this.d.returnUserIdByMail(dto.email);
            if (userId == null)
                throw new common_1.ConflictException('Данная почта не зарегистрирована, пожалуйста проверьте ее');
            const code = await randomCode.generateCode();
            if (userId)
                this.d.addCodeMail(userId, code);
            this.m.sendCode(dto.email, code);
            const json = {
                statusCode: common_1.HttpStatus.OK,
                message: `Письмо отправлено на почту: ${dto.email}`,
            };
            return res.status(common_1.HttpStatus.OK).json(json);
        };
        this.checkCode = async (res, dto) => {
            const userId = await this.d.returnUserIdByMail(dto.email);
            if (userId == null)
                throw new common_1.ConflictException('Данная почта не зарегистрирована, пожалуйста проверьте ее');
            const time = await this.d.checkCodeUser(userId, dto.code);
            if (time == null)
                throw new common_1.ConflictException('Неверный код');
            const checkTime = new class_1.CheckWidthTime(time);
            if (!checkTime.minutes(5))
                throw new common_1.RequestTimeoutException('Срок действия кода истек');
            const json = {
                statusCode: common_1.HttpStatus.OK,
                message: `Введен верный код`,
            };
            return res.status(common_1.HttpStatus.OK).json(json);
        };
        this.updatePassword = async (res, dto) => {
            if (!this.v.mail(dto.mail))
                throw new common_1.BadRequestException('mail is not valid');
            const userId = await this.d.returnUserIdByMail(dto.mail);
            if (userId == null)
                throw new common_1.ConflictException('Данная почта не зарегистрирована, пожалуйста проверьте ее');
            const time = await this.d.checkCodeUser(userId, dto.code);
            if (time == null)
                throw new common_1.ConflictException('Неверный код');
            if (!this.v.password(dto.password))
                throw new common_1.BadRequestException('Слишком легкий пароль');
            if (dto.password.length < 5)
                throw new common_1.BadRequestException('Слишком короткий пароль');
            const checkTime = new class_1.CheckWidthTime(time);
            if (!checkTime.minutes(7))
                throw new common_1.RequestTimeoutException('Срок действия кода истек');
            await this.d.updatePassword(userId, await this.h.createHash(dto.password));
            const json = {
                statusCode: common_1.HttpStatus.OK,
                message: `Пароль успешно изменен`,
            };
            return res.status(common_1.HttpStatus.OK).json(json);
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        validator_service_1.ValidatorService,
        hash_service_1.HashService,
        mail_service_1.MailService,
        tokens_service_1.TokensService])
], AuthService);
//# sourceMappingURL=auth.service.js.map