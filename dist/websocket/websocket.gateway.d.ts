import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CacheService } from 'src/cache/cache.service';
import { DatabaseService } from 'src/database/database.service';
export declare class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly cache;
    private readonly db;
    constructor(cache: CacheService, db: DatabaseService);
    server: Server;
    private users;
    private connections;
    afterInit(): void;
    handleConnection(socket: Socket): void;
    login(socket: Socket): Promise<void>;
    register(message: {
        session: string;
    }, socket: Socket): Promise<boolean>;
    handleDisconnect(socket: Socket): void;
}
