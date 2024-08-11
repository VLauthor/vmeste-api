import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DatabaseService } from '../database/database.service';
import { ValidatorService } from '../validator/validator.service';
import { HashService } from '../hash/hash.service';
import { MailService } from '../mail/mail.service';
import { SharedStateService } from '../shared-state/shared-state.service';
import { BadRequestException, HttpStatus } from '@nestjs/common';
import { objectUser } from '../objects/interfaces';

describe('UserService', () => {
  let service: UserService;
  let mockDatabaseService;
  let mockValidatorService;
  let mockHashService;

  beforeEach(async () => {
    mockDatabaseService = {
      returnPasswordByNickname: jest.fn(),
      returnPasswordByMail: jest.fn(),
      createSession: jest.fn(),
    };

    mockValidatorService = {
      mail: jest.fn(),
    };

    mockHashService = {
      checkHash: jest.fn(),
      createHash: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: DatabaseService, useValue: mockDatabaseService },
        { provide: ValidatorService, useValue: mockValidatorService },
        { provide: HashService, useValue: mockHashService },
        MailService,
        SharedStateService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('loginUser', () => {
    it('should return valid response for login with nickname', async () => {
      const login = 'nickname';
      const password = 'password';
      const user: objectUser = { user_id: 1, password_hash: 'hashedPassword' };

      mockDatabaseService.returnPasswordByNickname.mockResolvedValue(user);
      mockHashService.checkHash.mockResolvedValue(true);
      mockHashService.createHash.mockResolvedValue('mockedHash');
      mockDatabaseService.createSession.mockResolvedValue(true);

      const result = await service.loginUser(login, password);
      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: 'mockedHash',
      });
    });

    it('should return valid response for login with email', async () => {
      const login = 'email@example.com';
      const password = 'password';
      const user: objectUser = { user_id: 1, password_hash: 'hashedPassword' };

      mockDatabaseService.returnPasswordByNickname.mockResolvedValue(null);
      mockDatabaseService.returnPasswordByMail.mockResolvedValue(user);
      mockValidatorService.mail.mockReturnValue(true);
      mockHashService.checkHash.mockResolvedValue(true);
      mockHashService.createHash.mockResolvedValue('mockedHash');
      mockDatabaseService.createSession.mockResolvedValue(true);

      const result = await service.loginUser(login, password);
      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: 'mockedHash',
      });
    });

    it('should throw BadRequestException for invalid email', async () => {
      const login = 'invalidEmail';
      const password = 'password';

      mockDatabaseService.returnPasswordByNickname.mockResolvedValue(null);
      mockValidatorService.mail.mockReturnValue(false);

      await expect(service.loginUser(login, password)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for login failed', async () => {
      const login = 'email@example.com';
      const password = 'wrongpassword';

      mockDatabaseService.returnPasswordByNickname.mockResolvedValue(null);
      mockValidatorService.mail.mockReturnValue(true);
      mockDatabaseService.returnPasswordByMail.mockResolvedValue(null);

      await expect(service.loginUser(login, password)).rejects.toThrow(
        'login failed',
      );
    });
  });
});
