import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { PrismaModule } from '../prisma/prisma.module';
import { HashModule } from '../hash/hash.module';

@Module({
  imports: [PrismaModule, HashModule],
  exports: [DatabaseService],
  providers: [DatabaseService],
})
export class DatabaseModule {}
