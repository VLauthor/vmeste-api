"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const common_1 = require("@nestjs/common");
let CacheService = class CacheService {
    constructor() {
        this.cacheTG = new Map();
        this.usersTg = new Map();
        this.loginTG = new Map();
        this.cacheSocket = new Map();
        this.arrayQuizzes = [];
        this.setQuizzes = (data) => (this.arrayQuizzes = data);
        this.getAllQuizzes = () => this.arrayQuizzes;
        this.getOneQuizzes = (i) => this.arrayQuizzes[i];
        this.getTG = (key) => {
            return this.cacheTG.get(key);
        };
        this.getUsersTg = (key) => this.usersTg.get(key);
        this.setUsersTg = (key, data) => this.usersTg.set(key, data);
        this.setEditMessUserQuiz = (key, key2, value) => {
            console.log(key, key2, value);
            if (!this.usersTg.get(key).editMess)
                this.usersTg.get(key).editMess = {};
            this.usersTg.get(key).editMess.quiz = value;
        };
        this.getEditMessUser = async (key, key2) => {
            if (!this.usersTg.get(key).editMess || !this.usersTg.get(key).editMess.quiz)
                return false;
            return this.usersTg.get(key).editMess.quiz;
        };
        this.hasUsersTg = (key) => this.usersTg.has(key);
        this.setTG = (key, value, ttl) => {
            this.cacheTG.set(key, value);
            setTimeout(() => {
                this.cacheTG.delete(key);
            }, ttl * 60 * 1000);
        };
        this.delTG = (key) => {
            this.cacheTG.delete(key);
        };
        this.setSocket = (key, value) => {
            this.cacheSocket.set(key, value);
        };
        this.updateBoolTG = (key, value) => {
            const lettetData = this.cacheTG.get(key);
            lettetData.bool = value;
            setTimeout(() => {
                this.cacheTG.delete(key);
            }, 10000);
            this.cacheTG.set(key, lettetData);
        };
        this.setLoginTG = (key, value, ttl) => {
            this.loginTG.set(key, value);
            setTimeout(() => {
                this.loginTG.delete(key);
            }, ttl * 60 * 1000);
        };
        this.getLoginTG = (key) => {
            return this.loginTG.get(key);
        };
        this.deleteLoginTG = (key) => {
            this.loginTG.delete(key);
        };
        this.deleteTG = (key) => {
            this.cacheTG.delete(key);
        };
    }
};
exports.CacheService = CacheService;
exports.CacheService = CacheService = __decorate([
    (0, common_1.Injectable)()
], CacheService);
//# sourceMappingURL=cache.service.js.map