import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Response as ApiResponse } from '../types/interface/response.interface.js';

interface WrappedResult {
  data?: unknown;
  message?: string;
}

function isWrappedResult(value: unknown): value is WrappedResult {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value)
  );
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<unknown>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<unknown>> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((result: T): ApiResponse<unknown> => {
        const wrappedResult = isWrappedResult(result)
          ? result
          : undefined;

        return {
          ...(wrappedResult?.data !== undefined
            ? { data: wrappedResult.data }
            : {}),
          message: wrappedResult?.message ?? 'Request successful',
          status: response.statusCode,
        };
      }),
    );
  }
}