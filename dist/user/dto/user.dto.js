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
exports.getUserInfo = exports.getValid2FA = exports.getValidPersonalData = exports.getTelegramLoginDto = exports.updatePasswordDto = exports.checkCodeDto = exports.createCodeDto = exports.signinDto = exports.loginDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class loginDto {
}
exports.loginDto = loginDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], loginDto.prototype, "login", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], loginDto.prototype, "password", void 0);
class signinDto {
}
exports.signinDto = signinDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], signinDto.prototype, "last_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], signinDto.prototype, "first_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], signinDto.prototype, "patronomic", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], signinDto.prototype, "mail", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], signinDto.prototype, "nickname", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], signinDto.prototype, "number", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === '1' || value === 'true'),
    (0, class_transformer_1.Transform)(({ value }) => value === '0' || value === 'false'),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], signinDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], signinDto.prototype, "date_birthday", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], signinDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], signinDto.prototype, "tgKey", void 0);
class createCodeDto {
}
exports.createCodeDto = createCodeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createCodeDto.prototype, "mail", void 0);
class checkCodeDto {
}
exports.checkCodeDto = checkCodeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], checkCodeDto.prototype, "mail", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], checkCodeDto.prototype, "code", void 0);
class updatePasswordDto {
}
exports.updatePasswordDto = updatePasswordDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], updatePasswordDto.prototype, "mail", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], updatePasswordDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], updatePasswordDto.prototype, "password", void 0);
class getTelegramLoginDto {
}
exports.getTelegramLoginDto = getTelegramLoginDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], getTelegramLoginDto.prototype, "code", void 0);
class getValidPersonalData {
}
exports.getValidPersonalData = getValidPersonalData;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], getValidPersonalData.prototype, "nickname", void 0);
class getValid2FA {
}
exports.getValid2FA = getValid2FA;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], getValid2FA.prototype, "mail", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], getValid2FA.prototype, "phone", void 0);
class getUserInfo {
}
exports.getUserInfo = getUserInfo;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], getUserInfo.prototype, "session", void 0);
//# sourceMappingURL=user.dto.js.map