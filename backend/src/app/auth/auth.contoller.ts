import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  UseGuards,
  Get,
} from '@nestjs/common';

import type { Request, Response } from 'express';

import { AuthService } from './auth.service.js';
import { AuthDto } from './dto/Auth.dto.js';
import { CreateUserDto } from '../user/dto/create-user.dto.js';
import { RefreshTokenGuard } from '../../common/guards/refresh-token.guard.js';
import { SignUpDto } from './dto/SignUp.dto.js';
import { Roles } from '../../common/decorator/roles.decorator.js';
import { UserRoles } from '../../common/types/enum/role.enum.js';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../../common/decorator/public.decorator.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Cookie configuration
  private setAuthCookies(
    res: Response,
    tokens: {
      accessToken: string;
      refreshToken: string;
    },
  ) {
    const isProduction = process.env.NODE_ENV === 'production';

    // Access Token Cookie
    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
      path: '/',
    });

    // Refresh Token Cookie
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });
  }

  // Sign Up
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @Public()
  async signUp(
    @Body() createUserDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signUp(createUserDto);

    this.setAuthCookies(res, await result.data);

    return { message: result.message };
  }

  // Login
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Public()
  async signIn(
    @Body() data: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signIn(data);

    this.setAuthCookies(res, await result.data);

    return {
      message: 'Login successful',
    };
  }

  // Refresh Tokens
  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies?.refresh_token;
    return this.authService.refreshTokens(refreshToken);
  }

  // Logout
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refreshToken;

    const result = await this.authService.logout(refreshToken);

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return result;
  }

  // Create Account Employee
  @Post('create-account')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRoles.ADMIN)
  async createAccount(@Body() createUserDto: CreateUserDto) {
    return this.authService.createAccount(createUserDto);
  }
}
