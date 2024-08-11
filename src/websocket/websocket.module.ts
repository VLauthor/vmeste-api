import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { CacheModule } from 'src/cache/cache.module';
import { DatabaseModule } from 'src/database/database.module';
@Module({
  imports: [CacheModule, DatabaseModule],
  providers: [WebsocketGateway],
})
export class WebsocketModule {}
