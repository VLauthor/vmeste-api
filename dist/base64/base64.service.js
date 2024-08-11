"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base64Service = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let Base64Service = class Base64Service {
    async base64ToPng(id, base) {
        base = base.replace(/^data:image\/png;base64,/, '');
        await fs_1.default.writeFile(path_1.default.resolve(__dirname, `../../public/image/SHK/${id}.png`), base, 'base64', function (err) {
            if (err)
                throw err;
        });
    }
};
exports.Base64Service = Base64Service;
exports.Base64Service = Base64Service = __decorate([
    (0, common_1.Injectable)()
], Base64Service);
//# sourceMappingURL=base64.service.js.map