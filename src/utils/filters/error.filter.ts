import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseModel } from '../responseModel';


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse: ResponseModel<null> = {
      message:
        exception instanceof HttpException
          ? (exception.getResponse() as any).message || exception.message
          : 'Internal server error',
      success: false,
      error: {
        name: exception instanceof Error ? exception.name : 'Error',
        message: exception instanceof Error ? exception.message : 'Unexpected error',
        stack:
          process.env.NODE_ENV !== 'production' && exception instanceof Error
            ? exception.stack
            : undefined, // hide stack in prod
      },
    };

    response.status(status).json(errorResponse);
  }
}
