import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';

import { Public } from '../../common/decorator/public.decorator.js';
import { AuthService } from './auth.service.js';
import { GoogleProfile } from '../../common/types/interface/google.interface.js';

@Controller('google')
export class GoogleController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @Public()
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('redirect')
  @Public()
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const googleProfile = req.user as GoogleProfile;

    const user = await this.authService.googleLogin(
      googleProfile,
    );

    // Temporary response for testing account resolution.
    // Replace this with session creation, cookie setting,
    // and frontend redirect after connecting your JWT/session APIs.
    return res.status(200).json({
      message: 'Google account resolved successfully',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  }
}