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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./dto/user.dto");
const swagger_1 = require("@nestjs/swagger");
const joi_1 = require("joi");
let UserController = class UserController {
    constructor(s) {
        this.s = s;
    }
    getInfo(dto) {
        return this.s.getUserInfo(dto.session);
    }
    getLogin(dto) {
        return this.s.loginUser(dto.login, dto.password);
    }
    postRegistration(dto) {
        return this.s.signInUser(dto);
    }
    getValidPersonal(dto) {
        return this.s.validPersonalDate(dto);
    }
    getValid2FA(dto) {
        return this.s.valid2FA(dto);
    }
    postCodeCreate(dto) {
        return this.s.createCode(dto);
    }
    getCodeCheck(dto) {
        return this.s.checkCode(dto);
    }
    updatePassword(dto) {
        return this.s.updatePassword(dto);
    }
    test() {
        return 12;
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Get)('info'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.getUserInfo]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getInfo", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Get)('login'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.loginDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getLogin", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.signinDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "postRegistration", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Get)('signin/valid/personal'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.getValidPersonalData]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getValidPersonal", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Get)('signin/valid/2fa'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.getValid2FA]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getValid2FA", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)('code/create'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.createCodeDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "postCodeCreate", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Get)('code/check'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.checkCodeDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getCodeCheck", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Put)('password/update'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.updatePasswordDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updatePassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'test' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: joi_1.number }),
    (0, common_1.Get)('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "test", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map