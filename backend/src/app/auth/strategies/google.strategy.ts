
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  'google',
) {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.getOrThrow<string>(
        'GOOGLE_CLIENT_ID',
      ),
      clientSecret: configService.getOrThrow<string>(
        'GOOGLE_CLIENT_SECRET',
      ),
      callbackURL: `${configService.getOrThrow<string>(
        'BACKEND_URL',
      )}/api/v1/google/redirect`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const email = profile.emails?.[0]?.value
      ?.trim()
      .toLowerCase();

    const googleJson = profile._json as {
      email_verified?: boolean;
    };

    const emailVerified =
      googleJson.email_verified === true;

    if (!profile.id || !email || !emailVerified) {
      throw new UnauthorizedException(
        'Google account must have a verified email',
      );
    }

    return {
      googleId: profile.id,
      email,
      emailVerified,
      firstName: profile.name?.givenName ?? '',
      lastName: profile.name?.familyName ?? '',
    };
  }
}
