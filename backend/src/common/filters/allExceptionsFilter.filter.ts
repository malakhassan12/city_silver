import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import type { Request, Response } from 'express';
import { LoggerService } from '../service/logger/logger.service.js';


/*

  How use it ?
  throw new BuiltInException(
    'USER MESSAGE',
    {
      cause: originalError,
    },
  );

*/

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const isHttpException = exception instanceof HttpException;

    const statusCode = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // User message
    const userMessage =
      isHttpException && statusCode < 500
        ? this.getUserMessage(exception)
        : 'Something went wrong. Please try again later.';

    // Original error
    const originalError =
      isHttpException
        ? exception.cause ?? exception
        : exception;

    const errorMessage =
      originalError instanceof Error
        ? originalError.message
        : String(originalError);

    const stackTrace =
      originalError instanceof Error
        ? originalError.stack
        : undefined;

    // Developer logs
    const logData = {
      exceptionName: exception instanceof Error
        ? exception.constructor.name
        : 'UnknownException',

      userMessage,
      errorMessage,
      statusCode,
      method: request.method,
      path: request.url,
    };

    if (statusCode >= 500) {
      this.logger.error(
        JSON.stringify(logData),
        stackTrace,
        AllExceptionsFilter.name,
      );
    } else {
      this.logger.warn(
        JSON.stringify(logData),
        AllExceptionsFilter.name,
      );
    }

    // Client response
    response.status(statusCode).json({
      statusCode,
      message: userMessage,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private getUserMessage(exception: HttpException): string {
    const exceptionResponse = exception.getResponse();

    if (typeof exceptionResponse === 'string') {
      return exceptionResponse;
    }

    if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'message' in exceptionResponse
    ) {
      const message = exceptionResponse.message;

      if (typeof message === 'string') {
        return message;
      }

      if (Array.isArray(message)) {
        return message.join(', ');
      }
    }

    return 'Something went wrong.';
  }
}