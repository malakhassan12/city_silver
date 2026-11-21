import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTService } from '../provider/jwt.service.js';

type JwtPayload = {
  sub: string;
  role: string;
  sid: string;
  tokenType: 'ACCESS';
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly jwtService: JWTService,
  ) {
    const secret = configService.get<string>('JWT_ACCESS_SECRET');

    if (!secret) {
      throw new Error('JWT_ACCESS_SECRET is not configured');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload) {
    if (payload.tokenType !== 'ACCESS' || !payload.sid || !payload.sub) {
      throw new UnauthorizedException('Invalid access token');
    }

    const session = await this.jwtService.validateAccessSession(
      payload.sid,
      payload.sub,
    );

    if (!session) {
      throw new UnauthorizedException('Session is invalid or expired');
    }

    return payload;
  }
}
