import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt';

import { Request } from 'express';
import { JWTService } from '../provider/jwt.service.js';

type RefreshTokenPayload = {
  sub: string;
  role: string;
  sid: string;
  tokenType: 'REFRESH';
};

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    configService: ConfigService,
    private readonly jwtService: JWTService,
  ) {
    const secret = configService.get<string>('JWT_REFRESH_SECRET');

    if (!secret) {
      throw new Error('JWT_REFRESH_SECRET is not configured');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
      passReqToCallback: true,
    } as StrategyOptionsWithRequest);
  }

  async validate(req: Request, payload: RefreshTokenPayload) {
    if (payload.tokenType !== 'REFRESH' || !payload.sid || !payload.sub) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const refreshToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const isValid = await this.jwtService.validateRefreshSession(
      payload.sid,
      payload.sub,
      refreshToken,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid or expired session');
    }

    return {
      ...payload,
      refreshToken,
    };
  }
}
