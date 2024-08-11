"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckWidthTime = exports.Random = exports.DataTelegramKey = exports.UserTelegram = void 0;
const date_fns_1 = require("date-fns");
class UserTelegram {
    constructor(id, first_name, last_name, username) {
        this.user_tg_id = id;
        this.first_name = first_name;
        if (last_name)
            this.last_name = last_name;
        if (username)
            this.username = username;
    }
    returnPublicJson() {
        return {
            first_name: this.first_name,
            last_name: this.last_name,
            username: this.username,
        };
    }
    returnPublicInfoString() {
        return `Фамилия: ${this.first_name},\n${this.last_name ? 'Имя: ' + this.last_name + ',\n' : ''}${this.username ? 'Никнейм: ' + this.username : ''}`;
    }
    returnPrivateJson() {
        return this;
    }
    log() {
        console.log(this);
    }
}
exports.UserTelegram = UserTelegram;
class DataTelegramKey {
    constructor(key) {
        this.key = key;
    }
}
exports.DataTelegramKey = DataTelegramKey;
class Random {
    constructor(length) {
        this.generateString = async () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < this.length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                result += characters.charAt(randomIndex);
            }
            return result;
        };
        this.generateCode = async () => {
            let result = '';
            const characters = '0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < this.length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        };
        this.length = length;
    }
}
exports.Random = Random;
class CheckWidthTime {
    constructor(date) {
        this.minutes = (time) => {
            const newDate = new Date();
            newDate.setHours(newDate.getHours() + 3);
            const difference = Math.abs((0, date_fns_1.differenceInMinutes)(newDate, this.date));
            return difference <= time;
        };
        this.date = date;
    }
}
exports.CheckWidthTime = CheckWidthTime;
//# sourceMappingURL=class.js.map