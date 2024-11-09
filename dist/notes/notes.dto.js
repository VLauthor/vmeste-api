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
exports.notesDelete = exports.notesNew = exports.notesAll = void 0;
const class_validator_1 = require("class-validator");
class notesAll {
}
exports.notesAll = notesAll;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], notesAll.prototype, "session", void 0);
class notesNew {
}
exports.notesNew = notesNew;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], notesNew.prototype, "session", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], notesNew.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], notesNew.prototype, "description", void 0);
class notesDelete {
}
exports.notesDelete = notesDelete;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], notesDelete.prototype, "session", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], notesDelete.prototype, "id", void 0);
//# sourceMappingURL=notes.dto.js.map