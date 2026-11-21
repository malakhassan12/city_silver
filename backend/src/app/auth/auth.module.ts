import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWTService } from './provider/jwt.service.js';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service.js';
import { AuthRepository } from './repo/auth.repo.js';
import { AuthSession } from './entity/auth.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module.js';
import { AccessTokenStrategy } from './strategies/accessToken.strategy.js';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy.js';
import { RefreshTokenGuard } from '../../common/guards/refresh-token.guard.js';
import { HashProvider } from '../../common/provider/hash.provider.js';
import { OTPProvider } from '../../common/provider/otp.provider.js';
import { ResendService } from '../../config/resend.connection.js';
import { RedisService } from '../../config/redis/redis.connection.js';
import { GoogleStrategy } from './strategies/google.strategy.js';
import { AuthController } from './auth.contoller.js';
import { GoogleController } from './google.contoller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthSession]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController, GoogleController],
  providers: [
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AuthService,
    AuthRepository,
    RefreshTokenGuard,
    JWTService,
    HashProvider,
    OTPProvider,
    ResendService,
    RedisService,
    GoogleStrategy,
  ],
  exports: [],
})
export class AuthModule {}
