"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const common_1 = require("@nestjs/common");
const configuration_service_1 = require("../config/configuration.service");
const nodemailer = __importStar(require("nodemailer"));
const render_1 = require("@react-email/render");
const CodeVerified_1 = require("./templates/CodeVerified");
const path = require('path');
let MailService = class MailService {
    constructor(config) {
        this.config = config;
        this.transporter = nodemailer.createTransport({
            host: this.config.returnMailHostConfig(),
            port: this.config.returnMailPortConfig(),
            secure: true,
            auth: {
                user: this.config.returnMailHostUserConfig(),
                pass: this.config.returnMailPasswordConfig(),
            },
            logger: true,
            debug: false,
        }, {
            from: `Angelica VL <${this.config.returnMailHostUserConfig()}> `,
        });
        this.sendCode = async (mail, code) => {
            const emailHtml = await (0, render_1.render)((0, jsx_runtime_1.jsx)(CodeVerified_1.CodeVerified, { code: code }));
            const message = {
                from: `Anjelica VL < ${this.config.returnMailHostUserConfig()}> `,
                to: mail,
                subject: 'Код восстановления пароля',
                html: emailHtml,
            };
            await this.transporter.sendMail(message);
        };
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [configuration_service_1.ConfService])
], MailService);
//# sourceMappingURL=mail.service.js.map