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
import {
  checkCodeDto,
  createCodeDto,
  loginDto,
  signInDto,
  updatePasswordDto,
} from './auth.dto';
import { CheckWidthTime, Random } from '../objects/class';
import { MailService } from '../mail/mail.service';
import { message } from 'src/string/string';
// import { TBotService } from 'src/telegram-bot/telegram-bot.service';

@Injectable()
export class AuthService {
  constructor(
    private d: DatabaseService,
    private v: ValidatorService,
    private h: HashService,
    private m: MailService,
    private tokens: TokensService,
    // private bot: TBotService,
  ) {}
  public loginUser = async (res: Response, dto: loginDto) => {
    const { login, password } = dto;
    if (!this.v.mail(login)) throw new BadRequestException('mail is not valid');
    const resultMail: objectUser = await this.d.returnPasswordByMail(login);
    if (resultMail) {
      if (await this.h.checkHash(password, resultMail.password_hash)) {
        console.log('xd');

        const refreshToken = this.tokens.createRefreshToken({
          id: resultMail.user_id,
        });
        const accessToken = this.tokens.createAccessToken({
          id: resultMail.user_id,
          role: resultMail.role,
        });
        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'Strict',
          maxAge: 15 * 60 * 1000,
        });

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'Strict',
          maxAge: 14 * 24 * 60 * 60 * 1000,
        });
        const json: ResponseInt = {
          statusCode: HttpStatus.OK,
          message: 'Успешная авторизация',
        };
        return res.status(HttpStatus.OK).json(json);
      }
      throw new BadRequestException(
        'Неверный пароль. Пожалуйста проверьте его и повтоорите попытку.',
      );
    }
    throw new BadRequestException(
      'Не удалось провести авторизацию, повторите Ваш запрос позже!ы',
    );
  };

  public signInUser = async (res: Response, dto: signInDto) => {
    const initials: string[] = dto.initials.split(' ');
    if (initials.length !== 2 && initials.length !== 3)
      throw new BadRequestException(
        'Введены не все инициалы, пожалуйста проверьте его',
      );
    if (!this.v.nickname(dto.nickname))
      throw new BadRequestException(
        'Введен не кореектный никнейм, пожалуйста проверьте его.',
      );
    if (!this.v.password(dto.password))
      throw new BadRequestException(
        'Ваш пароль слишкм ленкий, пожалуйста усложните его.',
      );
    if (!this.v.date(dto.date))
      throw new BadRequestException(
        'Введена не кореектный дата рождения, пожалуйста проверьте её.',
      );
    dto.password = await this.h.createHash(dto.password);
    const result = await this.d.newUser(dto);
    if (result.error) throw new BadRequestException(result.error.message);
    const refreshToken = this.tokens.createRefreshToken({
      id: result.accept.data.payload.id,
    });
    const accessToken = this.tokens.createAccessToken(
      result.accept.data.payload,
    );
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });
    const json: ResponseInt = {
      statusCode: HttpStatus.OK,
      message: 'Успешная регистрация',
    };
    return res.status(HttpStatus.OK).json(json);
  };

  public createCode = async (res: Response, dto: createCodeDto) => {
    const randomCode = new Random(5);
    const userId = await this.d.returnUserIdByMail(dto.email);
    if (userId == null)
      throw new ConflictException(
        'Данная почта не зарегистрирована, пожалуйста проверьте ее',
      );
    const code = await randomCode.generateCode();
    if (userId) this.d.addCodeMail(userId, code);
    this.m.sendCode(dto.email, code);
    const json: ResponseInt = {
      statusCode: HttpStatus.OK,
      message: `Письмо отправлено на почту: ${dto.email}`,
    };
    return res.status(HttpStatus.OK).json(json);
  };

  public checkCode = async (res: Response, dto: checkCodeDto) => {
    const userId: number = await this.d.returnUserIdByMail(dto.email);
    if (userId == null)
      throw new ConflictException(
        'Данная почта не зарегистрирована, пожалуйста проверьте ее',
      );
    const time = await this.d.checkCodeUser(userId, dto.code);
    if (time == null) throw new ConflictException('Неверный код');
    const checkTime = new CheckWidthTime(time);
    if (!checkTime.minutes(5))
      throw new RequestTimeoutException('Срок действия кода истек');

    const json: ResponseInt = {
      statusCode: HttpStatus.OK,
      message: `Введен верный код`,
    };
    return res.status(HttpStatus.OK).json(json);
  };

  public updatePassword = async (
    res: Response,
    dto: updatePasswordDto,
  ): Promise<ResponseInt> => {
    if (!this.v.mail(dto.mail))
      throw new BadRequestException('mail is not valid');
    const userId: number = await this.d.returnUserIdByMail(dto.mail);
    if (userId == null)
      throw new ConflictException(
        'Данная почта не зарегистрирована, пожалуйста проверьте ее',
      );
    const time = await this.d.checkCodeUser(userId, dto.code);
    if (time == null) throw new ConflictException('Неверный код');
    if (!this.v.password(dto.password))
      throw new BadRequestException('Слишком легкий пароль');
    if (dto.password.length < 5)
      throw new BadRequestException('Слишком короткий пароль');
    const checkTime = new CheckWidthTime(time);
    if (!checkTime.minutes(7))
      throw new RequestTimeoutException('Срок действия кода истек');
    await this.d.updatePassword(userId, await this.h.createHash(dto.password));
    const json: ResponseInt = {
      statusCode: HttpStatus.OK,
      message: `Пароль успешно изменен`,
    };
    return res.status(HttpStatus.OK).json(json);
  };
}
