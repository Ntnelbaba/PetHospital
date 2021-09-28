import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { User } from './model/user';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiOperation({ summary: 'Authenthication' })
  @ApiResponse({
    status: 200,
    description: 'All Cool :)',
    type: String,
  })
  @ApiTags('Authenthication')
  @ApiBearerAuth()
  async login(@Body() user: User) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Authenthication' })
  @ApiResponse({
    status: 200,
    description: 'All Cool :)',
  })
  @ApiTags('Authenthication')
  getProfile(@Request() req) {
    return req.user;
  }
}
