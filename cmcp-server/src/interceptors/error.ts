/* eslint-disable prettier/prettier */
import {
  Logger,
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  private logger = new Logger()

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        this.logger.error(`::error ${JSON.stringify(error, null, 2)}`);

        return throwError(() => error as Record<string, unknown>);
      }),
    );
  }
}
