import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { createMock } from '@golevelup/ts-jest';
import { JwtService } from '@nestjs/jwt';
import { User } from '../model/user';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: createMock<UsersService>() },
        { provide: JwtService, useValue: createMock<JwtService>() },
      ],
    }).compile();
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should validate user return the user object', async () => {
    const userObject = { id: 0, username: 'test', password: 'test' } as User;
    jest
      .spyOn(userService, 'findOne')
      .mockImplementation(async () => userObject);
    const userAfterValidate = await service.validateUser(
      userObject.username,
      userObject.password
    );
    expect(userAfterValidate).toMatchObject(userObject);
  });
  it('should return null when validate user', async () => {
    const userObject = { id: 0, username: 'test', password: 'test' } as User;
    jest
      .spyOn(userService, 'findOne')
      .mockImplementation(async () => userObject);
    const userAfterValidate = await service.validateUser(
      userObject.username,
      'fail'
    );
    expect(userAfterValidate).toBeNull();
  });
  it('should login user and get token', async () => {
    const userObject = { id: 0, username: 'test', password: 'test' } as User;
    const mockToken = '1234567890';
    jest
      .spyOn(userService, 'findOne')
      .mockImplementation(async () => userObject);
    jest.spyOn(jwtService, 'sign').mockImplementation(() => mockToken);
    const tokenAfterLogin = await service.login(userObject);
    expect(tokenAfterLogin.access_token).toBe(mockToken);
  });
  it('should throw UnautorizeException when login fail', async () => {
    const userObject = { id: 0, username: 'test', password: 'test' } as User;
    const failUserObject = { ...userObject, password: 'fail' } as User;
    jest
      .spyOn(userService, 'findOne')
      .mockImplementation(async () => userObject);
    service.failedMessage = 'test fail message';

    try {
      await service.login(failUserObject);
    } catch (error) {
      expect(error instanceof UnauthorizedException).toBeTruthy();
      expect(error.message).toBe(service.failedMessage);
    }
  });
});
