import {
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export class AccountSuspendedException extends HttpException {
  constructor() {
    super(
      'Your account has been suspended',
      HttpStatus.FORBIDDEN,
    );
  }
}