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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pesponse_dto_1 = require("../objects/pesponse.dto");
const auth_dto_1 = require("./auth.dto");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(service) {
        this.service = service;
    }
    getLogin(res, dto) {
        return this.service.loginUser(res, dto);
    }
    postRegistration(res, dto) {
        return this.service.signInUser(res, dto);
    }
    postCodeCreate(res, dto) {
        return this.service.createCode(res, dto);
    }
    getCodeCheck(res, dto) {
        return this.service.checkCode(res, dto);
    }
    updatePassword(res, dto) {
        return this.service.updatePassword(res, dto);
    }
    test(res) {
        return this.service.test(res);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Авторизация пользователя',
        description: 'Ендпоинт для авторизации пользователя',
        tags: ['Авторизация', 'login'],
    }),
    (0, swagger_1.ApiBody)({
        type: auth_dto_1.loginDto,
        description: 'Данные для авторизации',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        type: pesponse_dto_1.GlobalErrorDTO,
        description: 'Результат возвращаемый при неверном заполнении полей',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: pesponse_dto_1.ResponseInt,
        description: 'Результат возвращаемый при успешной авторизации',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response, auth_dto_1.loginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getLogin", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Регистрация пользователя',
        description: 'Ендпоинт для регистрации пользователя',
        tags: ['Регистрация', 'signin'],
    }),
    (0, swagger_1.ApiBody)({
        type: auth_dto_1.signInDto,
        description: 'Данные для регистрации',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        type: pesponse_dto_1.GlobalErrorDTO,
        description: 'Результат возвращаемый при неверном заполнении полей',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: pesponse_dto_1.ResponseInt,
        description: 'Результат возвращаемый при успешной регистрации',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response, auth_dto_1.signInDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "postRegistration", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Получение кода',
        description: 'Создание кода для восстановления пароля',
        tags: ['Код', 'code'],
    }),
    (0, swagger_1.ApiBody)({
        type: auth_dto_1.createCodeDto,
        description: 'Данные для операции',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        type: pesponse_dto_1.GlobalErrorDTO,
        description: 'Результат возвращаемый при неверном заполнении полей',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: pesponse_dto_1.ResponseInt,
        description: 'Результат возвращаемый при отправке кода',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)('code/create'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response, auth_dto_1.createCodeDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "postCodeCreate", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Проверка кода для смены пароля пользователя',
        description: 'Ендпоинт для проверка кода для смены пароля пользователя',
        tags: ['Смена пароль', 'edit password'],
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        type: pesponse_dto_1.GlobalErrorDTO,
        description: 'Результат возвращаемый при неверном заполнении полей',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: pesponse_dto_1.ResponseInt,
        description: 'Результат возвращаемый при успешной авторизации',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Get)('code/check'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response, auth_dto_1.checkCodeDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getCodeCheck", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Изменение пароля',
        description: 'Изменение пароля',
        tags: ['Смена пароль', 'edit password'],
    }),
    (0, swagger_1.ApiBody)({
        type: auth_dto_1.updatePasswordDto,
        description: 'Данные для операции',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        type: pesponse_dto_1.GlobalErrorDTO,
        description: 'Результат возвращаемый при неверном заполнении полей',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: pesponse_dto_1.ResponseInt,
        description: 'Результат возвращаемый при отправке кода',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)('password/update'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response, auth_dto_1.updatePasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Post)('test'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "test", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Авторизация и регистрация'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map