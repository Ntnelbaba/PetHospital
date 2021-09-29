import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find admin user', async () => {
    const adminString = 'admin';
    const userAdminFound = await service.findOne(adminString);
    expect(userAdminFound.username).toBe(adminString);
  });
  it('should not find undefined user', async () => {
    const undefinedString = 'undefined';
    const userUndefinedFound = await service.findOne(undefinedString);
    expect(userUndefinedFound).not.toBeDefined();
  });
});
