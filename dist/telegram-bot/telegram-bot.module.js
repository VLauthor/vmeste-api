"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TBotModule = void 0;
const common_1 = require("@nestjs/common");
const telegram_bot_service_1 = require("./telegram-bot.service");
const inlinekeyboard_1 = require("./inlinekeyboard");
const configuration_module_1 = require("../config/configuration.module");
const cache_module_1 = require("../cache/cache.module");
const database_module_1 = require("../database/database.module");
const base64_module_1 = require("../base64/base64.module");
const barcode_module_1 = require("../barcode/barcode.module");
let TBotModule = class TBotModule {
};
exports.TBotModule = TBotModule;
exports.TBotModule = TBotModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cache_module_1.CacheModule,
            database_module_1.DatabaseModule,
            base64_module_1.Base64Module,
            barcode_module_1.BarcodeModule,
            configuration_module_1.ConfModule,
        ],
        providers: [telegram_bot_service_1.TBotService, inlinekeyboard_1.InlineKeyboards],
    })
], TBotModule);
//# sourceMappingURL=telegram-bot.module.js.map