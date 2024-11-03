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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const common_1 = require("@nestjs/common");
const express_1 = require("express");
const test_service_1 = require("./test.service");
const swagger_1 = require("@nestjs/swagger");
const request_dto_1 = require("./dto/request.dto");
const response_dto_1 = require("./dto/response.dto");
const pesponse_dto_1 = require("../objects/pesponse.dto");
let TestController = class TestController {
    constructor(s) {
        this.s = s;
    }
    CreateQuiz(response, dto) {
        const json = { id: 123 };
        return response.status(common_1.HttpStatus.OK).json(json);
    }
    AddQuestions(response, id, dto) {
        const json = { id: 123 };
        return response.status(common_1.HttpStatus.OK).json(json);
    }
};
exports.TestController = TestController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Создание викторины',
        description: 'Ендпоинт для создания карточки квиза.',
        tags: ['Квиз', 'Quiz'],
    }),
    (0, swagger_1.ApiBody)({
        type: request_dto_1.CreateQuizDTO,
        description: 'Данные для создания викторины',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: response_dto_1.CreateQuizResponseDTO,
        description: 'чв',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        type: pesponse_dto_1.GlobalErrorDTO,
        description: 'Резултат возвращаемый при неверном заполнении полей',
    }),
    (0, common_1.Post)('create'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object, request_dto_1.CreateQuizDTO]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "CreateQuiz", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Добавление вопросов к викторине.',
        description: 'Ендпоинт для добавления вопросов к викторине.',
        tags: ['Questions', 'Вопросы'],
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: Number,
        description: 'Идентификатор викторины',
    }),
    (0, swagger_1.ApiBody)({
        type: request_dto_1.AddQuestionsDTO,
        description: 'Данные для лобавления вопросов',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: response_dto_1.CreateQuizResponseDTO,
        description: 'Ответ с умпешным добавлением вопросов',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        type: pesponse_dto_1.GlobalErrorDTO,
        description: 'Резултат возвращаемый при неверном заполнении полей',
    }),
    (0, common_1.Post)(':id/questions/add'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object, String, request_dto_1.AddQuestionsDTO]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "AddQuestions", null);
exports.TestController = TestController = __decorate([
    (0, swagger_1.ApiTags)('Тестовый модуль'),
    (0, common_1.Controller)('test'),
    __metadata("design:paramtypes", [test_service_1.TestService])
], TestController);
//# sourceMappingURL=test.controller.js.map