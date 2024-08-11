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
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let NotesService = class NotesService {
    constructor(db) {
        this.db = db;
        this.getAllUserNotes = async (dto) => {
            console.log(dto.session);
            const resUserId = await this.db.getUserIdBySession(dto.session);
            if (resUserId == false)
                throw new common_1.BadRequestException('session does not exist');
            const notes = await this.db.getAllUserNotes(resUserId);
            if (notes.length == 0)
                return { statusCode: common_1.HttpStatus.OK, message: 'not notes' };
            return { statusCode: common_1.HttpStatus.OK, notes: notes };
        };
        this.newNotesUser = async (dto) => {
            const resUserId = await this.db.getUserIdBySession(dto.session);
            if (resUserId == false)
                throw new common_1.BadRequestException('session does not exist');
            await this.db.postNoteUser(resUserId, dto.name, dto.description);
            const notes = await this.db.getAllUserNotes(resUserId);
            if (notes.length == 0)
                return { statusCode: common_1.HttpStatus.OK, message: 'not notes' };
            return { statusCode: common_1.HttpStatus.CREATED, notes: notes };
        };
        this.deleteNotesUser = async (dto) => {
            const resUserId = await this.db.getUserIdBySession(dto.session);
            if (!Number(dto.id))
                throw new common_1.BadRequestException('id not valid');
            if (resUserId == false)
                throw new common_1.BadRequestException('session does not exist');
            await this.db.deleteNoteUser(Number(dto.id));
            const notes = await this.db.getAllUserNotes(resUserId);
            if (notes.length == 0)
                return { statusCode: common_1.HttpStatus.OK, message: 'not notes' };
            return { statusCode: common_1.HttpStatus.OK, notes: notes };
        };
    }
};
exports.NotesService = NotesService;
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], NotesService);
//# sourceMappingURL=notes.service.js.map