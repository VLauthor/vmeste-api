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
exports.AddQuestionsDTO = exports.AddQuestionDTO = exports.AddAnswerDTO = exports.CreateQuizDTO = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const testAnswersData = [
    { text: 'Вариант ответа 1', flag: false },
    { text: 'Вариант ответа 2', flag: false },
    { text: 'Вариант ответа 3', flag: true },
    { text: 'Вариант ответа 4', flag: false },
];
const testQuestionsData = [
    {
        text: 'Текст вопроса',
        hint: 'Подсказка',
        type: 'Текстовый',
        score: 9,
        answers: testAnswersData,
    },
    {
        text: 'Текст вопроса',
        hint: 'Подсказка',
        type: 'Текстовый',
        score: 9,
        answers: testAnswersData,
    },
];
class CreateQuizDTO {
}
exports.CreateQuizDTO = CreateQuizDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Название викторины',
        description: 'Название викторины, отображаемое в интерфейсе пользователя',
        type: String,
        required: true,
        default: 'Новая викторина',
    }),
    (0, class_validator_1.IsString)({
        message: 'Значение поля `Название викторины` должно быть строкой',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `Название викторины` обязательно для заполнения',
    }),
    __metadata("design:type", String)
], CreateQuizDTO.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Описание викторины',
        description: 'Название викторины, отображаемое в интерфейсе пользователя',
        type: String,
        required: false,
        default: 'Описание викторины',
    }),
    (0, class_validator_1.IsString)({
        message: 'Значение поля `Описание викторины` должно быть строкой',
    }),
    __metadata("design:type", String)
], CreateQuizDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['Математика', 'Алгоритмы'],
        description: 'Категории викторин, отображаемое в интерфейсе пользователя. По данному полю возможна фильтрация.',
        type: String,
        isArray: true,
        required: true,
        enum: [
            'Кино',
            'История',
            'Математика',
            'Физика',
            'Литература',
            'Студенчество',
            'Алгоритмы',
        ],
        default: ['Математика', 'Алгоритмы'],
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `Категории` обязательно для заполнения',
    }),
    (0, class_validator_1.IsArray)({ message: 'Категории должны быть массивом' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'Минимум одна категория должна быть указана' }),
    (0, class_validator_1.IsString)({
        each: true,
        message: 'Каждае значение в поле `Категории` должна быть строкой',
    }),
    __metadata("design:type", Array)
], CreateQuizDTO.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Легко',
        description: 'Уровень сложности викторин, отображаемое в интерфейсе пользователя. По данному полю возможна фильтрация.',
        type: String,
        required: true,
        enum: ['Легко', 'Нормально', 'Сложно'],
        default: 'Легко',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `Сложность` обязательно для заполнения',
    }),
    (0, class_validator_1.IsString)({ message: 'Значение поля `Сложность` должно быть строкой' }),
    __metadata("design:type", String)
], CreateQuizDTO.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['Кооледж', 'ТТД'],
        description: 'Разрешение на прохождение викторин, не отображаемое в интерфейсе пользователя. По данному полю возможна фильтрация.',
        type: String,
        isArray: true,
        required: false,
        enum: ['Кооледж', 'Университет', 'ТТД'],
        default: ['Кооледж', 'ТТД'],
    }),
    (0, class_validator_1.IsArray)({ message: 'Ограничения должны быть массивом' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'Минимум одно ограничение должно быть указано' }),
    (0, class_validator_1.IsString)({
        each: true,
        message: 'Каждое значение в поле `Ограничения` ограничение должно быть строкой',
    }),
    __metadata("design:type", Array)
], CreateQuizDTO.prototype, "limitation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 50,
        description: 'Временное ограничениевикторин, отображаемое в интерфейсе пользователя. Пройти викторину можно только в течение данного времени.',
        type: Number,
        required: false,
        default: 0,
        minimum: 300,
    }),
    (0, class_validator_1.IsInt)({
        message: 'Значение поля `Временное ограничение` должно быть числом',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `Временное ограничение` обязательно для заполнения',
    }),
    __metadata("design:type", Number)
], CreateQuizDTO.prototype, "time_limit", void 0);
class AddAnswerDTO {
}
exports.AddAnswerDTO = AddAnswerDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Вариант ответа',
        description: 'Ответ на вопрос',
        type: String,
        required: true,
        default: 'Вариант ответа',
    }),
    (0, class_validator_1.IsString)({
        message: 'Значение поля `Текст ответа` должно быть строкой',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `Текст ответа` обязательно для заполнения',
    }),
    __metadata("design:type", String)
], AddAnswerDTO.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Правильность ответа (чек-бокс)',
        type: String,
        required: true,
        default: true,
    }),
    (0, class_validator_1.IsBoolean)({
        message: 'Значение поля `Правильность ответа`(чек-бокс) должно быть в формате true/false',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `Правильность ответа`(чек-бокс) обязательно для заполнения',
    }),
    __metadata("design:type", Boolean)
], AddAnswerDTO.prototype, "flag", void 0);
class AddQuestionDTO {
}
exports.AddQuestionDTO = AddQuestionDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Текст вопроса',
        description: 'Текст вопроса, отображаемое в интерфейсе пользователя',
        type: String,
        required: true,
        default: 'Текст вопроса',
    }),
    (0, class_validator_1.IsString)({
        message: 'Значение поля `Текст вопроса` должно быть строкой',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `Текст вопроса` обязательно для заполнения',
    }),
    __metadata("design:type", String)
], AddQuestionDTO.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Подсказка',
        description: 'Подсказка, отображаемое в интерфейсе пользователя',
        type: String,
        required: true,
        default: 'Подсказка',
    }),
    (0, class_validator_1.IsString)({
        message: 'Значение поля `Подсказка` должно быть строкой',
    }),
    __metadata("design:type", String)
], AddQuestionDTO.prototype, "hint", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Текстовый',
        description: 'Тип вопроса, не отображаемое в интерфейсе пользователя. Данное значение определяет тип варианта ответа',
        type: String,
        required: true,
        enum: ['С вариантами ответов', 'Текстовый', 'Числовой', 'Да/Нет'],
        default: 'Текстовый',
    }),
    (0, class_validator_1.IsString)({
        each: true,
        message: 'Каждое значение поля `Тип вопроса` должно быть строкой',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `Тип вопроса` обязательно для заполнения',
    }),
    __metadata("design:type", String)
], AddQuestionDTO.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: 'Количество начисляемых баллов за правильный ответ',
        type: String,
        required: true,
        minimum: 10,
        default: 10,
    }),
    (0, class_validator_1.IsInt)({
        message: 'Значение поля `Количество баллов` должно быть числом',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Поле `Количество баллов` обязательно для заполнения',
    }),
    __metadata("design:type", Number)
], AddQuestionDTO.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: testAnswersData,
        description: 'Массиов ответов на вопрос',
        type: AddAnswerDTO,
        isArray: true,
        required: true,
        default: testAnswersData,
    }),
    (0, class_validator_1.IsArray)({ message: 'Ответы должны быть массивом' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'Минимум один ответ должен быть указан' }),
    __metadata("design:type", Array)
], AddQuestionDTO.prototype, "answers", void 0);
class AddQuestionsDTO {
}
exports.AddQuestionsDTO = AddQuestionsDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: testQuestionsData,
        description: 'Массиов вопросов викторины',
        type: AddQuestionDTO,
        isArray: true,
        required: true,
        default: testQuestionsData,
    }),
    (0, class_validator_1.IsArray)({ message: 'Вопросы должны быть массивом' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'Минимум один вопрос должен быть указан' }),
    __metadata("design:type", Array)
], AddQuestionsDTO.prototype, "questions", void 0);
//# sourceMappingURL=request.dto.js.map