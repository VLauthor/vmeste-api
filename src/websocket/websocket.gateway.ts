import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CacheService } from 'src/cache/cache.service';
import { DatabaseService } from 'src/database/database.service';
import { Random } from 'src/objects/class';

@WebSocketGateway({ namespace: 'api/socket/telegram' })
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly cache: CacheService,
    private readonly db: DatabaseService,
  ) {}
  @WebSocketServer() server: Server;
  private users: { [key: string]: string } = {};
  private connections: string[] = [];
  afterInit() {
    console.log('WebSocket server initialized');
  }
  handleConnection(socket: Socket) {
    console.log('Client connected: ', socket.id);
    this.users[socket.id] = socket.id;
    this.connections.push(socket.id);

    this.server.emit('onMessage', {
      id: 'socket id: ' + socket.id,
      message: 'A new client has connected',
    });
    // console.log(this.users);
  }
  @SubscribeMessage('loginTelegram')
  async login(@ConnectedSocket() socket: Socket) {
    const rand = new Random(15);
    const str: string = await rand.generateString();
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
        } else if (value.bool == false) {
          socket.emit('disableTelegramLogin', {
            msg: 'login rejected',
          });
          this.cache.deleteLoginTG(str);
          clearInterval(interval);
        }
      }
    }, 2000);
  }
  @SubscribeMessage('registerTelegram')
  async register(
    @MessageBody() message: { session: string },
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(message.session);
    const id = await this.db.getIdBySession(message.session);
    if (id == null)
      return socket.emit('disableTelegramRegister', {
        msg: 'you are not registered',
      });
    if (await this.db.checkTelegramVerifyById(id))
      return socket.emit('disableTelegramRegister', {
        msg: 'a telegram is already linked to this account',
      });
    const rand = new Random(15);
    const str: string = await rand.generateString();
    socket.emit('urlTelegramRegister', {
      url: `https://t.me/angelica_vl_bot?start=register-${str}`,
    });
    const maxTime = 3 * 60 * 1000;
    let currentTime = 0;
    const interval = setInterval(async () => {
      currentTime += 2000;
      if (currentTime >= maxTime) {
        clearInterval(interval);
        socket.emit('disableTelegramRegister', {
          msg: 'timeout register',
        });
      }
      const value = this.cache.getTG(str);
      if (value) {
        if (value.bool == true) {
          this.db.addTelegramVerify(id, value);
          socket.emit('acceptTelegramRegister', {
            data: value,
          });
          this.cache.deleteTG(str);
          clearInterval(interval);
        } else if (value.bool == false) {
          socket.emit('disableTelegramRegister', {
            msg: 'registration rejected',
          });
          this.cache.deleteTG(str);
          clearInterval(interval);
        }
      }
    }, 2000);
  }

  handleDisconnect(socket: Socket) {
    console.log('Client disconnected: ', socket.id);
    delete this.users[socket.id];
    this.connections = this.connections.filter((id) => id !== socket.id);
    this.server.emit('onMessage', {
      id: 'socket id: ' + socket.id,
      message: 'A client has disconnected',
    });
    console.log(this.users);
  }
}
