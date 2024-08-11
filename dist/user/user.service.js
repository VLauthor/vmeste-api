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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const validator_service_1 = require("../validator/validator.service");
const hash_service_1 = require("../hash/hash.service");
const class_1 = require("../objects/class");
const mail_service_1 = require("../mail/mail.service");
let UserService = class UserService {
    constructor(d, v, h, m) {
        this.d = d;
        this.v = v;
        this.h = h;
        this.m = m;
        this.loginUser = async (login, password) => {
            const resultNickname = await this.d.returnPasswordByNickname(login);
            if (resultNickname)
                if (await this.h.checkHash(password, resultNickname.password_hash)) {
                    const rand = new class_1.Random(25);
                    const random = await rand.generateString();
                    await this.d.createSession(random, resultNickname.user_id);
                    return { statusCode: common_1.HttpStatus.OK, message: random };
                }
            if (!this.v.mail(login))
                throw new common_1.BadRequestException('mail is not valid');
            const resultMail = await this.d.returnPasswordByMail(login);
            if (resultMail) {
                if (await this.h.checkHash(password, resultMail.password_hash)) {
                    const r = new class_1.Random(25);
                    const random = await r.generateString();
                    await this.d.createSession(random, resultMail.user_id);
                    return { statusCode: common_1.HttpStatus.OK, message: random };
                }
            }
            throw new common_1.BadRequestException('login failed');
        };
        this.signInUser = async (user) => {
            const [day, month, year] = user.date_birthday.split('.');
            user.date_birthday = `${year}-${month}-${day}T00:00:00Z`;
            user.gender = Boolean(user.gender);
            if (!this.v.nickname(user.nickname))
                throw new common_1.BadRequestException('nickname is not valid');
            if (!this.v.mail(user.mail))
                throw new common_1.BadRequestException('mail is not valid');
            if (!this.v.phone(user.number))
                throw new common_1.BadRequestException('phone is not valid');
            if (user.password.length < 5)
                throw new common_1.BadRequestException('password is too short');
            if (!this.v.password(user.password))
                throw new common_1.BadRequestException('easy password');
            user.password = await this.h.createHash(user.password);
            const result = await this.d.newUser(user);
            if (result.message) {
                const rand = new class_1.Random(25);
                const random = await rand.generateString();
                this.d.createSession(random, Number(result.message));
                result.message = random;
                return result;
            }
            throw new common_1.BadRequestException(result);
        };
        this.createCode = async (dto) => {
            if (!this.v.mail(dto.mail))
                throw new common_1.BadRequestException('mail is not valid');
            const randomCode = new class_1.Random(5);
            const userId = await this.d.returnUserIdByMail(dto.mail);
            if (userId == null)
                throw new common_1.ConflictException('mail is not register');
            const code = await randomCode.generateCode();
            if (userId)
                this.d.addCodeMail(userId, code);
            this.m.sendCode(dto.mail, code);
            return { statusCode: common_1.HttpStatus.CREATED, data: 'email sent' };
        };
        this.checkCode = async (dto) => {
            if (!(await this.v.mail(dto.mail)))
                throw new common_1.BadRequestException('mail is not valid');
            const userId = await this.d.returnUserIdByMail(dto.mail);
            if (userId == null)
                throw new common_1.ConflictException('mail is not register');
            const time = await this.d.checkCodeUser(userId, dto.code);
            if (time == null)
                throw new common_1.ConflictException('invalid code');
            const checkTime = new class_1.CheckWidthTime(time);
            if (!checkTime.minutes(5))
                throw new common_1.RequestTimeoutException('code is not up to date');
            return { statusCode: common_1.HttpStatus.OK, message: 'accept' };
        };
        this.updatePassword = async (dto) => {
            if (!this.v.mail(dto.mail))
                throw new common_1.BadRequestException('mail is not valid');
            const userId = await this.d.returnUserIdByMail(dto.mail);
            if (userId == null)
                throw new common_1.ConflictException('mail is not register');
            const time = await this.d.checkCodeUser(userId, dto.code);
            if (time == null)
                throw new common_1.ConflictException('invalid code');
            if (!this.v.password(dto.password))
                throw new common_1.BadRequestException('easy password');
            if (dto.password.length < 5)
                throw new common_1.BadRequestException('password is too short');
            const checkTime = new class_1.CheckWidthTime(time);
            if (!checkTime.minutes(7))
                throw new common_1.RequestTimeoutException('code is not up to date');
            await this.d.updatePassword(userId, await this.h.createHash(dto.password));
            return { statusCode: common_1.HttpStatus.OK, message: 'accept' };
        };
        this.validPersonalDate = async (dto) => {
            if (!this.v.nickname(dto.nickname))
                throw new common_1.BadRequestException('nickname is not valid');
            if ((await this.d.checkRegisterNickname(dto.nickname)) != 0)
                throw new common_1.ConflictException('nickname register');
            return { statusCode: common_1.HttpStatus.OK, message: 'accept' };
        };
        this.valid2FA = async (dto) => {
            if (!this.v.mail(dto.mail))
                throw new common_1.BadRequestException('mail is not valid');
            if (!this.v.phone(dto.phone))
                throw new common_1.BadRequestException('phone is not valid');
            if ((await this.d.checkRegisterMail(dto.mail)) != 0)
                throw new common_1.ConflictException('mail register');
            if ((await this.d.checkRegisterPhome(dto.phone)) != 0)
                throw new common_1.ConflictException('phone register');
            return { statusCode: common_1.HttpStatus.OK, message: 'accept' };
        };
        this.getUserInfo = async (session) => {
            const resUserId = await this.d.getUserIdBySession(session);
            if (resUserId == false)
                throw new common_1.BadRequestException('session does not exist');
            return {
                statusCode: common_1.HttpStatus.OK,
                data: await this.d.getUserInfo(resUserId),
            };
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        validator_service_1.ValidatorService,
        hash_service_1.HashService,
        mail_service_1.MailService])
], UserService);
//# sourceMappingURL=user.service.js.map