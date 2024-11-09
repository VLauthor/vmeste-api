"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestModule = void 0;
const common_1 = require("@nestjs/common");
const test_service_1 = require("./test.service");
const configuration_module_1 = require("../config/configuration.module");
const configuration_service_1 = require("../config/configuration.service");
const test_controller_1 = require("./test.controller");
const database_module_1 = require("../database/database.module");
let TestModule = class TestModule {
};
exports.TestModule = TestModule;
exports.TestModule = TestModule = __decorate([
    (0, common_1.Module)({
        imports: [configuration_module_1.ConfModule, database_module_1.DatabaseModule],
        providers: [configuration_service_1.ConfService, test_service_1.TestService],
        controllers: [test_controller_1.TestController],
        exports: [test_service_1.TestService],
    })
], TestModule);
//# sourceMappingURL=test.module.js.map