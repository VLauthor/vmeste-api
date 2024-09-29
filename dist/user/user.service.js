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
const tokens_service_1 = require("../tokens/tokens.service");
const mail_service_1 = require("../mail/mail.service");
let UserService = class UserService {
    constructor(d, v, h, m, tokens) {
        this.d = d;
        this.v = v;
        this.h = h;
        this.m = m;
        this.tokens = tokens;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        validator_service_1.ValidatorService,
        hash_service_1.HashService,
        mail_service_1.MailService,
        tokens_service_1.TokensService])
], UserService);
const xd = {
    xd: 'xd2-0ie02j3duj309rj3',
    xd2: 'wejdfojenodnnn2oidepwjfpi',
    xd3: 'djfoi32j40230',
    xd4: '-_-',
};
//# sourceMappingURL=user.service.js.map