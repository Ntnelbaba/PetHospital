import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../model/user';

@Injectable()
export class AuthService {
  failedMessage = 'Username and password not matched';
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<Partial<User>> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    if (!(await this.validateUser(user.username, user.password))) {
      throw new UnauthorizedException(this.failedMessage);
    }
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
