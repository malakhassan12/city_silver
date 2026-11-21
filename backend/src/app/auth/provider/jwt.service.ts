import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../repo/auth.repo.js';
import { HashProvider } from '../../../common/provider/hash.provider.js';

export interface RefreshTokenPayload {
  sub: string;
  role: string;
  sid: string;
  tokenType: 'REFRESH';
}

@Injectable()
export class JWTService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly authRepo: AuthRepository,
    private readonly hashProvider: HashProvider,
  ) {}


  // Generate Access and Refresh Tokens
  async getTokens(userId: string, role: string, sessionId: string) {
    const [accessToken, refreshToken] = await Promise.all([
      // Access Token
      this.jwtService.signAsync(
        {
          sub: userId,
          role,
          sid: sessionId,
          tokenType: 'ACCESS',
        },
        {
          secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),

      // Refresh Token
      this.jwtService.signAsync(
        {
          sub: userId,
          role,
          sid: sessionId,
          tokenType: 'REFRESH',
        },
        {
          secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  // Verify Refresh Token
  async verifyRefreshToken(refreshToken: string): Promise<RefreshTokenPayload> {
    let payload: RefreshTokenPayload;

    try {
      payload = await this.jwtService.verifyAsync<RefreshTokenPayload>(
        refreshToken,
        {
          secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        },
      );
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    if (payload.tokenType !== 'REFRESH' || !payload.sid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return payload;
  }

  async validateRefreshSession(
    sid: string,
    userId: string,
    refreshToken: string,
  ): Promise<boolean> {
    const session = await this.authRepo.findOneBySessionIdAndUserId(
      sid,
      userId,
    );

    if (!session) {
      return false;
    }
    // Verify Refresh Token Hash
    const tokenMatches = await this.hashProvider.verifyHash(
      session.refreshTokenHash,
      refreshToken,
    );

    if (!tokenMatches) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return true;
  }

  async validateAccessSession(sid: string, userId: string) {
    return this.authRepo.findOneBySessionIdAndUserId(sid, userId);
  }
}
