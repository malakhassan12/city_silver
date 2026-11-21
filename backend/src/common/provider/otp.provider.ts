import { Injectable } from '@nestjs/common';
import { randomInt, timingSafeEqual } from 'node:crypto';
import { HashProvider } from './hash.provider.js';

@Injectable()
export class OTPProvider {
  constructor(private readonly hashProvider: HashProvider) {}

  // Generate a 6-digit OTP
  generateOTP(): string {
    return randomInt(100000, 1000000).toString();
  }

  // Verify OTP
  verifyOTP(otp: string, otpHash: string): Promise<boolean> {
    return this.hashProvider.verifyHash(otpHash, otp);
  }

  hashOTP(otp: string): Promise<string> {
    return this.hashProvider.hashData(otp);
  }
}
