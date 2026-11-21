import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from '../user/user.service.js';
import { CreateUserDto } from '../user/dto/create-user.dto.js';
import { AuthDto } from './dto/Auth.dto.js';
import { JWTService } from './provider/jwt.service.js';
import { AuthRepository } from './repo/auth.repo.js';
import { HashProvider } from '../../common/provider/hash.provider.js';
import { UserRoles } from '../../common/types/enum/role.enum.js';
import { SignUpDto } from './dto/SignUp.dto.js';
import { ResetPassword } from './dto/ResetPassword.dto.js';
import { UserType } from '../../common/types/type/user.type.js';
import { OTPProvider } from '../../common/provider/otp.provider.js';
import { ResendService } from '../../config/resend.connection.js';
import { RedisService } from '../../config/redis/redis.connection.js';
import { randomBytes } from 'node:crypto';
import { randomUUID } from 'node:crypto';
import { Request } from 'express';
import { GoogleProfile } from '../../common/types/interface/google.interface.js';
import { LoggerService } from '../../common/service/logger/logger.service.js';
import { UserResponseDto } from '../user/dto/user-response.dto.js';
import { toUserResponse } from './mapper/user-reponse.mapper.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JWTService,
    private readonly authRepo: AuthRepository,
    private readonly hashProvider: HashProvider,
    private readonly otpProvider: OTPProvider,
    private readonly resendService: ResendService,
    private readonly redisService: RedisService,
    private readonly loggerService: LoggerService,
  ) {}


  /*
  
  Login , signup , create account 
  
  */
  async googleLogin(googleProfile: GoogleProfile) {
    if (
      !googleProfile ||
      !googleProfile.googleId ||
      !googleProfile.email ||
      !googleProfile.emailVerified
    ) {
      throw new UnauthorizedException('Invalid or unverified Google account');
    }

    // 1. Check whether this Google account is already linked.
    let user = await this.usersService.findByGoogleId(googleProfile.googleId);

    if (user) {
      if (user.role !== UserRoles.CLIENT) {
        throw new ForbiddenException(
          'Google login is only available for clients',
        );
      }
    } else {
      // 2. Check whether a local account uses this email.
      user = await this.usersService.findByEmail(googleProfile.email);

      if (user) {
        if (user.role !== UserRoles.CLIENT) {
          throw new ForbiddenException(
            'Google login is not available for staff accounts',
          );
        }

        // 3. Link the verified Google identity.
        user = await this.usersService.linkGoogleId(
          user.id,
          googleProfile.googleId,
        );
      } else {
        // 4. Create a new CLIENT account.
        user = await this.usersService.createGoogleUser({
          googleId: googleProfile.googleId,
          email: googleProfile.email,
          emailVerified: googleProfile.emailVerified,
          firstName: googleProfile.firstName,
          lastName: googleProfile.lastName,
        });
      }
    }

    return user;
  }

  // Create Auth Session and Generate Tokens
  private async createAuthSession(user: any) {
    const sessionId = randomUUID();

    // Generate tokens
    const tokens = await this.jwtService.getTokens(
      user.id,
      user.role,
      sessionId,
    );

    // Hash Refresh Token
    const refreshTokenHash = await this.hashProvider.hashData(
      tokens.refreshToken,
    );

    // Save session
    await this.authRepo.createSession({
      sessionId: sessionId,
      userId: user.id,
      refreshTokenHash,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return tokens;
  }

  // Sign Up
  async signUp(createUserDto: SignUpDto) {
    // Check if user exists
    const userExists = await this.usersService.findByEmail(createUserDto.email);

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Create new user
    const newUser = await this.usersService.createUser({
      ...createUserDto,
      role: UserRoles.CLIENT,
    });

    return {
      data: this.createAuthSession(newUser),
      message: 'Account created successfully',
    };
  }

  // Sign In
  async signIn(data: AuthDto) {
    // Check if user exists
    const user = await this.usersService.findByEmail(data.email);

    this.loggerService.log(JSON.stringify(user));

    if (!user) {
      throw new UnauthorizedException('This email not exists in out website');
    }

    // Verify password
    const passwordMatches = await this.hashProvider.verifyHash(
      user.password,
      data.password,
    );
    this.loggerService.log(JSON.stringify(passwordMatches));

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { data: this.createAuthSession(user) };
  }

  // Logout
  async logout(refreshToken: string) {
    // Verify Refresh Token
    const payload = await this.jwtService.verifyRefreshToken(refreshToken);

    // Find session
    const session = await this.authRepo.findSessionById(payload.sid);

    if (
      !session ||
      session.userId !== payload.sub ||
      session.revokedAt ||
      new Date(session.expiresAt) <= new Date()
    ) {
      throw new UnauthorizedException('Invalid session');
    }

    // Verify Refresh Token Hash
    const tokenMatches = await this.hashProvider.verifyHash(
      session.refreshTokenHash,
      refreshToken,
    );

    if (!tokenMatches) {
      throw new UnauthorizedException('Invalid session');
    }

    // Revoke session
    await this.authRepo.revokeSession(payload.sid);

    return {
      message: 'Logged out successfully',
    };
  }

  // Refresh Tokens
  async refreshTokens(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    // Verify Refresh Token
    const payload = await this.jwtService.verifyRefreshToken(refreshToken);

    // Find current session
    const session = await this.authRepo.findSessionById(payload.sid);

    if (
      !session ||
      session.userId !== payload.sub ||
      session.revokedAt ||
      new Date(session.expiresAt).getTime() <= Date.now()
    ) {
      throw new UnauthorizedException('Invalid or expired session');
    }

    // Verify Refresh Token Hash
    const tokenMatches = await this.hashProvider.verifyHash(
      session.refreshTokenHash,
      refreshToken,
    );

    if (!tokenMatches) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Check if user still exists
    const user = await this.usersService.findOneUser(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Generate new tokens using the same session ID
    const tokens = await this.jwtService.getTokens(
      user.id,
      user.role,
      session.id,
    );

    // Hash new Refresh Token
    const newRefreshTokenHash = await this.hashProvider.hashData(
      tokens.refreshToken,
    );

    // Atomically replace old Refresh Token Hash
    const updated = await this.authRepo.rotateSession(
      session.id,
      session.refreshTokenHash,
      newRefreshTokenHash,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    );

    if (!updated) {
      throw new UnauthorizedException(
        'Refresh token has already been used or revoked',
      );
    }

    return { data: tokens };
  }
  
  // Create Account
  async createAccount(createUserDto: CreateUserDto): Promise<{
    message: string;
    data: {user : UserResponseDto};
  }> {
    const { email, password, ...userData } = createUserDto;

    // Check if user already exists
    const userExists = await this.usersService.findByEmail(email);

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    // Create employee account
    const employeeData = {
      ...userData,
      email,
      password,
      role: UserRoles.EMPLOYEE,
    };

    const user = await this.usersService.createUser(employeeData);

    return {
      message: 'Employee account created successfully',
      data: {
        user: toUserResponse(user),
      },
    };
  }
  // Reset Pass
  async resetPassword(user: UserType, resetPass: ResetPassword) {
    const { newPassword, oldPassword } = resetPass;
    const userId = user.sub;

    // Find user
    const userFromService = await this.usersService.findOneUser(userId);

    if (!userFromService) {
      throw new NotFoundException('User not found');
    }

    // Verify old password
    const isPasswordValid = await this.hashProvider.verifyHash(
      userFromService.password,
      oldPassword,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Hash new password
    const hashedPassword = await this.hashProvider.hashData(newPassword);

    // Save new password
    await this.usersService.changePass(userId, hashedPassword);

    return {
      message: 'Password changed successfully',
    };
  }

  private async saveOTP(
    userId: string,
    email: string,
    otp: string,
  ): Promise<string> {
    const resetRequestId = randomUUID();

    const otpHash = await this.hashProvider.hashData(otp);

    const data = JSON.stringify({
      userId,
      email: email.trim().toLowerCase(),
      otpHash,
      attempts: 0,
      verified: false,
    });

    await this.redisService.set(
      `password-reset:request:${resetRequestId}`,
      data,
      300,
    );

    return resetRequestId;
  }

  async sendOTP(email: string) {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await this.usersService.findByEmail(normalizedEmail);

    if (!user) {
      throw new UnauthorizedException('Email does not exist');
    }

    const otp = this.otpProvider.generateOTP();

    const resetRequestId = await this.saveOTP(user.id, user.email, otp);

    await this.resendService.sendMessage({
      email: user.email,
      subject: 'Password Reset - City Silver 925',
      content: `
      <h2>Password Reset</h2>
      <p>Your verification code is:</p>
      <h1>${otp}</h1>
      <p>This code expires in 5 minutes.</p>
    `,
    });

    return {
      message: 'OTP sent successfully!',
      resetRequestId,
    };
  }

  async submitOTP(resetRequestId: string, otp: string) {
    const key = `password-reset:request:${resetRequestId}`;

    const storedData = await this.redisService.get(key);

    if (!storedData) {
      throw new UnauthorizedException('Invalid or expired reset request');
    }

    const data = JSON.parse(storedData) as {
      userId: string;
      email: string;
      otpHash: string;
      attempts: number;
      verified: boolean;
    };

    if (data.verified) {
      throw new UnauthorizedException('OTP has already been verified');
    }

    if (data.attempts > 5) {
      await this.redisService.del(key);

      throw new UnauthorizedException('Too many attempts. Request a new OTP');
    }

    const isValid = await this.hashProvider.verifyHash(data.otpHash, otp);

    if (!isValid) {
      data.attempts++;

      const remainingTTL = await this.redisService.ttl(key);

      if (remainingTTL <= 0) {
        await this.redisService.del(key);

        throw new UnauthorizedException('OTP has expired');
      }

      await this.redisService.set(key, JSON.stringify(data), remainingTTL);

      throw new UnauthorizedException('Invalid OTP');
    }

    data.verified = true;
    delete (data as Partial<typeof data>).otpHash;

    const remainingTTL = await this.redisService.ttl(key);

    if (remainingTTL <= 0) {
      await this.redisService.del(key);

      throw new UnauthorizedException('Reset request has expired');
    }

    await this.redisService.set(key, JSON.stringify(data), remainingTTL);

    return {
      message: 'OTP verified successfully!',
    };
  }

  async forgetPassword(resetRequestId: string, newPass: string) {
    const key = `password-reset:request:${resetRequestId}`;

    const storedData = await this.redisService.get(key);

    if (!storedData) {
      throw new UnauthorizedException('Invalid or expired reset request');
    }

    const data = JSON.parse(storedData) as {
      userId: string;
      email: string;
      verified: boolean;
    };

    if (!data.verified) {
      throw new UnauthorizedException('You must verify your OTP first');
    }

    const hashedPassword = await this.hashProvider.hashData(newPass);

    await this.usersService.changePass(data.userId, hashedPassword);

    await this.redisService.del(key);

    return {
      message: 'Password changed successfully!',
    };
  }
}
