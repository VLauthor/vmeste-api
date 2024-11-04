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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const cache_service_1 = require("../cache/cache.service");
const database_service_1 = require("../database/database.service");
const class_1 = require("../objects/class");
let WebsocketGateway = class WebsocketGateway {
    constructor(cache, db) {
        this.cache = cache;
        this.db = db;
        this.users = {};
        this.connections = [];
    }
    afterInit() {
        console.log('WebSocket server initialized');
    }
    handleConnection(socket) {
        console.log('Client connected: ', socket.id);
        this.users[socket.id] = socket.id;
        this.connections.push(socket.id);
        this.server.emit('onMessage', {
            id: 'socket id: ' + socket.id,
            message: 'A new client has connected',
        });
    }
    async login(socket) {
        const rand = new class_1.Random(15);
        const str = await rand.generateString();
        socket.emit('urlTelegramLogin', {
            url: `https://t.me/angelica_vl_bot?start=login-${str}`,
        });
        const maxTime = 3 * 60 * 1000;
        let currentTime = 0;
        const interval = setInterval(async () => {
            currentTime += 2000;
            if (currentTime >= maxTime) {
                clearInterval(interval);
                socket.emit('disableTelegramLogin', {
                    msg: 'timeout login',
                });
            }
            const value = this.cache.getLoginTG(str);
            if (value) {
                if (value.bool == true) {
                    socket.emit('acceptTelegramLogin', {
                        session: value.session,
                    });
                    this.cache.deleteTG(str);
                    return clearInterval(interval);
                }
                else if (value.bool == false) {
                    socket.emit('disableTelegramLogin', {
                        msg: 'login rejected',
                    });
                    this.cache.deleteLoginTG(str);
                    clearInterval(interval);
                }
            }
        }, 2000);
    }
    handleDisconnect(socket) {
        console.log('Client disconnected: ', socket.id);
        delete this.users[socket.id];
        this.connections = this.connections.filter((id) => id !== socket.id);
        this.server.emit('onMessage', {
            id: 'socket id: ' + socket.id,
            message: 'A client has disconnected',
        });
        console.log(this.users);
    }
};
exports.WebsocketGateway = WebsocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebsocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('loginTelegram'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], WebsocketGateway.prototype, "login", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('registerTelegram'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "handleDisconnect", null);
exports.WebsocketGateway = WebsocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: 'api/socket/telegram' }),
    __metadata("design:paramtypes", [cache_service_1.CacheService,
        database_service_1.DatabaseService])
], WebsocketGateway);
//# sourceMappingURL=websocket.gateway.js.map