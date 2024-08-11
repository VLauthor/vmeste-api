import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseService } from '../database/database.service';
import { PrismaService } from '../prisma/prisma.service';
import { ValidatorService } from '../validator/validator.service';
import { HashService } from '../hash/hash.service';
import { MailService } from '../mail/mail.service';
import { SharedStateService } from '../shared-state/shared-state.service';
import { HttpStatus } from '@nestjs/common';
import { loginDto } from './dto/user.dto';
import { ConfService } from '../config/configuration.service';
describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  const client = new PrismaService();
  const d: DatabaseService = new DatabaseService(client);
  const v: ValidatorService = new ValidatorService();
  const h: HashService = new HashService();
  let config: ConfService;
  const m: MailService = new MailService(config);
  const data: SharedStateService = new SharedStateService();
  beforeEach(async () => {
    service = new UserService(d, v, h, m, data);
    controller = new UserController(service);
  });
  describe('loginUser', () => {
    it('should return login result', async () => {
      let result: Promise<{ statusCode: HttpStatus; message: string }>;
      // const result = [];
      const dto: loginDto = { login: 'VLauthor', password: 'd43rjf_D' };
      jest.spyOn(service, 'loginUser').mockImplementationOnce(() => result);
      expect(await controller.getLogin(dto)).toBe(result);
    });
  });
  //await controller.getLogin(dto)
});
