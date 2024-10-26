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
exports.ConfService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let ConfService = class ConfService {
    constructor(configService) {
        this.configService = configService;
    }
    returnUrlDb() {
        return this.configService.get('DATABASE_URL');
    }
    returnMailHostConfig() {
        return this.configService.get('MAIL_HOST');
    }
    returnMailHostUserConfig() {
        return this.configService.get('MAIL_HOST_USER');
    }
    returnMailPasswordConfig() {
        return this.configService.get('MAIL_HOST_PASSWORD');
    }
    returnMailPortConfig() {
        return this.configService.get('MAIL_PORT');
    }
    returnTgToken() {
        return this.configService.get('BOT_TOKEN');
    }
    returnAccessSalt() {
        return this.configService.get('ACCESS_SALT');
    }
    returnRefreshSalt() {
        return this.configService.get('REFRESH_SALT');
    }
};
exports.ConfService = ConfService;
exports.ConfService = ConfService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ConfService);
//# sourceMappingURL=configuration.service.js.map