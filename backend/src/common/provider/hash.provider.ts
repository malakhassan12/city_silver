import { Injectable } from '@nestjs/common';

import * as argon2 from 'argon2';

@Injectable()
export class HashProvider {
  // Hash password or refresh token
  hashData(data: string): Promise<string> {
    return argon2.hash(data);
  }

  // Verify hashed data
  verifyHash(hash: string, data: string): Promise<boolean> {
    return argon2.verify(hash, data);
  }
}
