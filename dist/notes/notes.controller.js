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
exports.NotesController = void 0;
const common_1 = require("@nestjs/common");
const notes_dto_1 = require("./notes.dto");
const notes_service_1 = require("./notes.service");
let NotesController = class NotesController {
    constructor(s) {
        this.s = s;
    }
    allNotes(dto) {
        return this.s.getAllUserNotes(dto);
    }
    postNotes(dto) {
        return this.s.newNotesUser(dto);
    }
    deleteNotes(dto) {
        return this.s.deleteNotesUser(dto);
    }
};
exports.NotesController = NotesController;
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notes_dto_1.notesAll]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "allNotes", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notes_dto_1.notesNew]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "postNotes", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notes_dto_1.notesDelete]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "deleteNotes", null);
exports.NotesController = NotesController = __decorate([
    (0, common_1.Controller)('notes'),
    __metadata("design:paramtypes", [notes_service_1.NotesService])
], NotesController);
//# sourceMappingURL=notes.controller.js.map