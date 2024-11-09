import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { PrismaModule } from '../prisma/prisma.module';
import { HashModule } from '../hash/hash.module';
import { QuizDatabaseService } from './quizdb.service';
import { AuthDatabaseService } from './auth.service';

@Module({
  imports: [PrismaModule, HashModule],
  exports: [DatabaseService, QuizDatabaseService, AuthDatabaseService],
  providers: [DatabaseService, QuizDatabaseService, AuthDatabaseService],
})
export class DatabaseModule {}
