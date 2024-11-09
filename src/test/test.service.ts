import { Injectable } from '@nestjs/common';
import { ConfService } from 'src/config/configuration.service';
import { Payload } from 'src/objects/interfaces';
import { QuizDatabaseService } from 'src/database/quizdb.service';
import { CreateQuizDTO } from './dto/request.dto';
@Injectable()
export class TestService {
  private db: QuizDatabaseService;
  constructor(db: QuizDatabaseService) {
    this.db = db;
  }

  public CreateQuiz = async (data: CreateQuizDTO) => {};
}
