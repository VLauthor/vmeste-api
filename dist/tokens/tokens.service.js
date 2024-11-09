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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensService = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configuration_service_1 = require("../config/configuration.service");
let TokensService = class TokensService {
    constructor(config) {
        this.config = config;
        this.accessSalt = this.config.returnAccessSalt();
        this.refreshSalt = this.config.returnRefreshSalt();
        this.createRefreshToken = (payload) => {
            return jsonwebtoken_1.default.sign(payload, this.refreshSalt, { expiresIn: '14d' });
        };
        this.verifyRefreshToken = (token) => {
            try {
                const result = jsonwebtoken_1.default.verify(token, this.refreshSalt);
                return result.id;
            }
            catch (e) {
                return null;
            }
        };
        this.createAccessToken = (payload) => {
            return jsonwebtoken_1.default.sign(payload, this.accessSalt, { expiresIn: '15m' });
        };
        this.verifyAccessToken = (token) => {
            try {
                const result = jsonwebtoken_1.default.verify(token, this.accessSalt);
                return result.id;
            }
            catch (e) {
                return null;
            }
        };
    }
};
exports.TokensService = TokensService;
exports.TokensService = TokensService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [configuration_service_1.ConfService])
], TokensService);
//# sourceMappingURL=tokens.service.js.map