import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Response, objectUser } from '../objects/interfaces';
import { ValidatorService } from '../validator/validator.service';
import { HashService } from '../hash/hash.service';
import {
  checkCodeDto,
  createCodeDto,
  getTelegramLoginDto,
  getValid2FA,
  getValidPersonalData,
  signinDto,
  updatePasswordDto,
} from './dto/user.dto';
import { CheckWidthTime, Random } from '../objects/class';
import { MailService } from '../mail/mail.service';
// import { TBotService } from 'src/telegram-bot/telegram-bot.service';
import { setInterval } from 'timers';
@Injectable()
export class UserService {
  constructor(
    private d: DatabaseService,
    private v: ValidatorService,
    private h: HashService,
    private m: MailService,
    // private bot: TBotService,
  ) {}
  public loginUser = async (login: string, password: string) => {
    const resultNickname: objectUser =
      await this.d.returnPasswordByNickname(login);
    if (resultNickname)
      if (await this.h.checkHash(password, resultNickname.password_hash)) {
        const rand = new Random(25);
        const random = await rand.generateString();
        // const hash = await this.h.createHash(random);
        await this.d.createSession(random, resultNickname.user_id);
        return { statusCode: HttpStatus.OK, message: random };
      }
    if (!this.v.mail(login)) throw new BadRequestException('mail is not valid');
    const resultMail: objectUser = await this.d.returnPasswordByMail(login);
    if (resultMail) {
      if (await this.h.checkHash(password, resultMail.password_hash)) {
        const r = new Random(25);
        const random = await r.generateString();
        // const hash = await this.h.createHash(random);
        await this.d.createSession(random, resultMail.user_id);
        return { statusCode: HttpStatus.OK, message: random };
      }
    }
    throw new BadRequestException('login failed');
  };

  public signInUser = async (user: signinDto) => {
    const [day, month, year] = user.date_birthday.split('.');
    user.date_birthday = `${year}-${month}-${day}T00:00:00Z`;
    user.gender = Boolean(user.gender);
    if (!this.v.nickname(user.nickname))
      throw new BadRequestException('nickname is not valid');
    if (!this.v.mail(user.mail))
      throw new BadRequestException('mail is not valid');
    if (!this.v.phone(user.number))
      throw new BadRequestException('phone is not valid');
    // if (!this.v.date(user.date_birthday))
    //   throw new BadRequestException('date is not valid');
    if (user.password.length < 5)
      throw new BadRequestException('password is too short');
    if (!this.v.password(user.password))
      throw new BadRequestException('easy password');
    user.password = await this.h.createHash(user.password);
    const result = await this.d.newUser(user);
    if (result.message) {
      const rand = new Random(25);
      const random = await rand.generateString();
      this.d.createSession(random, Number(result.message));
      result.message = random;
      return result;
    }
    throw new BadRequestException(result);
  };

  public createCode = async (dto: createCodeDto) => {
    if (!this.v.mail(dto.mail))
      throw new BadRequestException('mail is not valid');
    const randomCode = new Random(5);
    const userId = await this.d.returnUserIdByMail(dto.mail);
    if (userId == null) throw new ConflictException('mail is not register');
    const code = await randomCode.generateCode();
    if (userId) this.d.addCodeMail(userId, code);
    this.m.sendCode(dto.mail, code);
    return { statusCode: HttpStatus.CREATED, data: 'email sent' };
  };

  public checkCode = async (dto: checkCodeDto) => {
    if (!(await this.v.mail(dto.mail)))
      throw new BadRequestException('mail is not valid');
    const userId: number = await this.d.returnUserIdByMail(dto.mail);
    if (userId == null) throw new ConflictException('mail is not register');
    const time = await this.d.checkCodeUser(userId, dto.code);
    if (time == null) throw new ConflictException('invalid code');
    const checkTime = new CheckWidthTime(time);
    if (!checkTime.minutes(5))
      throw new RequestTimeoutException('code is not up to date');
    return { statusCode: HttpStatus.OK, message: 'accept' };
  };

  public updatePassword = async (dto: updatePasswordDto): Promise<Response> => {
    if (!this.v.mail(dto.mail))
      throw new BadRequestException('mail is not valid');

    const userId: number = await this.d.returnUserIdByMail(dto.mail);
    if (userId == null) throw new ConflictException('mail is not register');
    const time = await this.d.checkCodeUser(userId, dto.code);
    if (time == null) throw new ConflictException('invalid code');
    if (!this.v.password(dto.password))
      throw new BadRequestException('easy password');
    if (dto.password.length < 5)
      throw new BadRequestException('password is too short');
    const checkTime = new CheckWidthTime(time);
    if (!checkTime.minutes(7))
      throw new RequestTimeoutException('code is not up to date');
    await this.d.updatePassword(userId, await this.h.createHash(dto.password));
    return { statusCode: HttpStatus.OK, message: 'accept' };
  };
  public validPersonalDate = async (
    dto: getValidPersonalData,
  ): Promise<Response> => {
    if (!this.v.nickname(dto.nickname))
      throw new BadRequestException('nickname is not valid');
    if ((await this.d.checkRegisterNickname(dto.nickname)) != 0)
      throw new ConflictException('nickname register');
    return { statusCode: HttpStatus.OK, message: 'accept' };
  };
  public valid2FA = async (dto: getValid2FA) => {
    if (!this.v.mail(dto.mail))
      throw new BadRequestException('mail is not valid');
    if (!this.v.phone(dto.phone))
      throw new BadRequestException('phone is not valid');
    if ((await this.d.checkRegisterMail(dto.mail)) != 0)
      throw new ConflictException('mail register');
    if ((await this.d.checkRegisterPhome(dto.phone)) != 0)
      throw new ConflictException('phone register');
    return { statusCode: HttpStatus.OK, message: 'accept' };
  };
  public getUserInfo = async (session: string) => {
    const resUserId = await this.d.getUserIdBySession(session);
    if (resUserId == false)
      throw new BadRequestException('session does not exist');
    return {
      statusCode: HttpStatus.OK,
      data: await this.d.getUserInfo(resUserId),
    };
  };
}
