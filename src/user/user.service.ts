import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { objectUser, ResponseInt } from '../objects/interfaces';
import { ValidatorService } from '../validator/validator.service';
import { HashService } from '../hash/hash.service';
import { TokensService } from 'src/tokens/tokens.service';
import { Response } from 'express';
import { CheckWidthTime, Random } from '../objects/class';
import { MailService } from '../mail/mail.service';
// import { TBotService } from 'src/telegram-bot/telegram-bot.service';

@Injectable()
export class UserService {
  constructor(
    private d: DatabaseService,
    private v: ValidatorService,
    private h: HashService,
    private m: MailService,
    private tokens: TokensService,
    // private bot: TBotService,
  ) {}
}

const xd = {
  xd: 'xd2-0ie02j3duj309rj3',
  xd2: 'wejdfojenodnnn2oidepwjfpi',
  xd3: 'djfoi32j40230',
  xd4: '-_-',
};
