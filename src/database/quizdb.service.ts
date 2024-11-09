import { Injectable } from '@nestjs/common';
import {
  CacheTelegram,
  DatabaseResult,
  objectUser,
  Payload,
  Questions,
  Quiz,
  Reminder,
} from 'src/objects/interfaces';
import { PrismaService } from '../prisma/prisma.service';
import { signInDto } from 'src/auth/auth.dto';
import { HashService } from '../hash/hash.service';
import { CreateQuizDTO } from 'src/test/dto/request.dto';
@Injectable()
export class QuizDatabaseService {
  private p: PrismaService;
  private h;
  constructor(client: PrismaService) {
    this.p = client;
    this.h = HashService;
  }

  public CreateQuiz = async (authorID: number, data) => {
    await this.p.quiz.create({
      data: {
        author_id: authorID,
        title: data.title,
        description: data.description,
      },
    });
  };
}
