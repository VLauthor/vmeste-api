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
exports.updatePasswordDto = exports.checkCodeDto = exports.createCodeDto = exports.signInDto = exports.loginDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class loginDto {
}
exports.loginDto = loginDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'example@example.com',
        description: 'Является почтой пользователя, служит для верификации клиента.',
        type: String,
        required: true,
        default: 'example@example.com',
    }),
    (0, class_validator_1.IsString)({ message: 'Значение поля `Почта` должно быть строкой' }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `Почта` обязательно для заполнения',
    }),
    __metadata("design:type", String)
], loginDto.prototype, "login", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'j3j4fd-9j43pihf3j2rfjpi3hg',
        description: 'Пароль пользователя. Является ключевой строкой для входа пользователя, служит для верификации клиента.',
        type: String,
        required: true,
        default: 'j3j4fd-9j43pihf3j2rfjpi3hg',
    }),
    (0, class_validator_1.IsString)({ message: 'Значение поля `Пароль` должно быть строкой' }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `Пароль` обязательно для заполнения',
    }),
    __metadata("design:type", String)
], loginDto.prototype, "password", void 0);
class signInDto {
}
exports.signInDto = signInDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Иванов Иван Иванович',
        description: 'Инициалы пользователя. Фамилия Имя Отчества или Фамилия Имя',
        type: String,
        required: true,
        default: 'Иванов Иван Иванович',
    }),
    (0, class_validator_1.IsString)({
        message: 'Значение поля `ФИО` должно быть строкой',
    }),
    (0, class_validator_1.MinLength)(8, { message: 'Ваши инициалы не могут быть меньше 8 символов' }),
    (0, class_validator_1.MaxLength)(100, {
        message: 'Ваши инициалы не могут быть больше 100 символов',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `ФИО` обязательно для заполнения',
    }),
    __metadata("design:type", String)
], signInDto.prototype, "initials", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'VLauthor',
        description: 'Никнейм пользователя.',
        type: String,
        required: true,
        default: 'VLauthor',
    }),
    (0, class_validator_1.IsString)({ message: 'Значение поля `Никнейм` должно быть строкой' }),
    (0, class_validator_1.MinLength)(3, { message: 'Слишком короткий никнейм' }),
    (0, class_validator_1.MaxLength)(10, { message: 'Слишком длинный никнейм' }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `Никнейм` обязательно для заполнения',
    }),
    __metadata("design:type", String)
], signInDto.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'example@example.com',
        description: 'Никнейм пользователя.',
        type: String,
        required: true,
        default: 'example@example.com',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `Почта` обязательно для заполнения',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Пожалуйста, убедитесь, что ваша почта валидна' }),
    __metadata("design:type", String)
], signInDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2000-01-01',
        description: 'Никнейм пользователя.',
        type: String,
        required: true,
        default: '2000-01-01',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `Дата рождения` обязательно для заполнения',
    }),
    (0, class_validator_1.IsDateString)({}, { message: 'Дата рождения должна быть корректной датой' }),
    __metadata("design:type", String)
], signInDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Пол пользователя.',
        type: Boolean,
        required: true,
        default: true,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `Пол` обязательно для заполнения',
    }),
    (0, class_validator_1.IsBoolean)({ message: 'Пол должен быть булевым значением' }),
    __metadata("design:type", Boolean)
], signInDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'jjfr943fj3j49j4',
        description: 'Пароль пользователя. Является ключевой строкой для входа пользователя, служит для верификации клиента.',
        type: String,
        required: true,
        default: 'jjfr943fj3j49j4',
    }),
    (0, class_validator_1.IsString)({
        message: 'Значение поля `Пароль` должно быть строкой',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `Пароль` обязательно для заполнения',
    }),
    (0, class_validator_1.MinLength)(6, { message: 'Слишком короткий пароль' }),
    __metadata("design:type", String)
], signInDto.prototype, "password", void 0);
class createCodeDto {
}
exports.createCodeDto = createCodeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'example@example.com',
        description: 'Является почтой пользователя, служит для верификации клиента.',
        type: String,
        required: true,
        default: 'example@example.com',
    }),
    (0, class_validator_1.IsString)({ message: 'Значение поля `Почта` должно быть строкой' }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `Почта` обязательно для заполнения',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Пожалуйста, убедитесь, что ваша почта валидна' }),
    __metadata("design:type", String)
], createCodeDto.prototype, "email", void 0);
class checkCodeDto {
}
exports.checkCodeDto = checkCodeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'example@example.com',
        description: 'Является почтой пользователя, служит для верификации клиента.',
        type: String,
        required: true,
        default: 'example@example.com',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Пожалуйста, убедитесь, что ваша почта валидна' }),
    (0, class_validator_1.IsString)({ message: 'Значение поля `Почта` должно быть строкой' }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `Почта` обязательно для заполнения',
    }),
    __metadata("design:type", String)
], checkCodeDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123456',
        description: 'Является кодом пользователя, служит для смены пароля.',
        type: String,
        required: true,
        default: '123456',
    }),
    (0, class_validator_1.IsString)({ message: 'Значение поля `Код` должно быть строкой' }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `Код` обязательно для заполнения',
    }),
    (0, class_validator_1.Length)(5, 5, { message: 'Ваш код не валидный' }),
    __metadata("design:type", String)
], checkCodeDto.prototype, "code", void 0);
class updatePasswordDto {
}
exports.updatePasswordDto = updatePasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'example@example.com',
        description: 'Является почтой пользователя, служит для верификации клиента.',
        type: String,
        required: true,
        default: 'example@example.com',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Пожалуйста, убедитесь, что ваша почта валидна' }),
    (0, class_validator_1.IsString)({ message: 'Значение поля `Почта` должно быть строкой' }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `Почта` обязательно для заполнения',
    }),
    __metadata("design:type", String)
], updatePasswordDto.prototype, "mail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123456',
        description: 'Является кодом пользователя, служит для смены пароля.',
        type: String,
        required: true,
        default: '123456',
    }),
    (0, class_validator_1.IsString)({ message: 'Значение поля `Код` должно быть строкой' }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `Код` обязательно для заполнения',
    }),
    (0, class_validator_1.Length)(5, 5, { message: 'Ваш код не валидный' }),
    __metadata("design:type", String)
], updatePasswordDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'j3j4fd-9j43pihf3j2rfjpi3hg',
        description: 'Пароль пользователя. Является ключевой строкой для входа пользователя, служит для верификации клиента.',
        type: String,
        required: true,
        default: 'j3j4fd-9j43pihf3j2rfjpi3hg',
    }),
    (0, class_validator_1.IsString)({ message: 'Значение поля `Пароль` должно быть строкой' }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `Пароль` обязательно для заполнения',
    }),
    (0, class_validator_1.MinLength)(6, { message: 'Слишком короткий пароль' }),
    __metadata("design:type", String)
], updatePasswordDto.prototype, "password", void 0);
//# sourceMappingURL=auth.dto.js.map