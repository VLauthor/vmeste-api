"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./database/database.module");
const user_module_1 = require("./user/user.module");
const validator_module_1 = require("./validator/validator.module");
const mail_module_1 = require("./mail/mail.module");
const telegram_bot_module_1 = require("./telegram-bot/telegram-bot.module");
const configuration_module_1 = require("./config/configuration.module");
const configuration_service_1 = require("./config/configuration.service");
const telegram_module_1 = require("./telegram/telegram.module");
const websocket_module_1 = require("./websocket/websocket.module");
const cache_module_1 = require("./cache/cache.module");
const notes_module_1 = require("./notes/notes.module");
const base64_module_1 = require("./base64/base64.module");
const barcode_module_1 = require("./barcode/barcode.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            user_module_1.UserModule,
            validator_module_1.ValidatorModule,
            mail_module_1.MailModule,
            telegram_bot_module_1.TBotModule,
            configuration_module_1.ConfModule,
            telegram_module_1.TelegramModule,
            websocket_module_1.WebsocketModule,
            cache_module_1.CacheModule,
            notes_module_1.NotesModule,
            base64_module_1.Base64Module,
            barcode_module_1.BarcodeModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, configuration_service_1.ConfService],
        exports: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map