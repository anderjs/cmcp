/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Catch,
  HttpException,
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  /**
   * Handles exceptions thrown during request processing and sends a standardized JSON error response.
   *
   * @param exception - The exception object thrown during request handling. Can be of any type.
   * @param host - The `ArgumentsHost` instance providing methods to access the underlying request and response objects.
   *
   * The method determines the HTTP status code and error message based on whether the exception is an instance of `HttpException`.
   * If not, it defaults to a 500 Internal Server Error. The response includes the error message, status code, and a timestamp.
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response: Response = ctx.getResponse();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    if (typeof message === 'object') {
      delete (message as Record<string, unknown>).statusCode;
    }


    response.status(status).json({
      status: status,
      error: message,
      response: null,
      timestamp: new Date().toISOString(),
    });
  }
}