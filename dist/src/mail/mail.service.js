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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const configuration_service_1 = require("../config/configuration.service");
const nodemailer = __importStar(require("nodemailer"));
const path = require('path');
const ejs_1 = __importDefault(require("ejs"));
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
        this.send = async (message) => {
            const result = await new Promise((resolve, reject) => {
                this.transporter.sendMail(message, (err) => {
                    if (err) {
                        console.log(err);
                        return reject({
                            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                            error: 'mail could not be sent',
                        });
                    }
                    return resolve({ statusCode: common_1.HttpStatus.CREATED, data: 'email sent' });
                });
            });
            return result;
        };
        this.sendCode = async (mail, code) => {
            const logoPath = path.join(__dirname, '../../public/image/logo.png');
            const mailPath = path.join(__dirname, '../../public/views/mail.ejs');
            const html = await ejs_1.default.renderFile(mailPath, {
                c1: code[0],
                c2: code[1],
                c3: code[2],
                c4: code[3],
                c5: code[4],
                c6: code[5],
            });
            const image = {
                filename: 'image.png',
                path: logoPath,
                cid: 'unique@image.cid',
            };
            const message = {
                from: `Anjelica VL < ${this.config.returnMailHostUserConfig()}> `,
                to: mail,
                subject: 'Код восстановления пароля',
                html: html,
                attachments: [image],
            };
            return await this.send(message);
        };
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [configuration_service_1.ConfService])
], MailService);
//# sourceMappingURL=mail.service.js.map