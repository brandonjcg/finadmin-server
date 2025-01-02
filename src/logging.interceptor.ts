import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request } from 'express';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IGenericResponse, TODO } from './common';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name, {
    timestamp: true,
  });

  intercept(context: ExecutionContext, next: CallHandler): Observable<TODO> {
    return next.handle().pipe(
      map((res: Response) => this.responseHandler(res, context)),
      catchError((err) => throwError(() => this.errorHandler(err, context))),
    );
  }

  loggerRequest = (
    request: Request,
    statusCode: number,
    exception?: HttpException,
  ) => {
    if (statusCode < 400) {
      this.logger.log(`${request.method} ${request.url}`);
    } else {
      this.logger.error(`${request.method} ${request.url}`, exception.stack);
    }
  };

  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.BAD_REQUEST;
    const errorMessage =
      exception instanceof HttpException
        ? [exception.getResponse()['message']]
        : [exception['message']];

    this.loggerRequest(request, statusCode, exception);

    response.status(statusCode).json({
      error: true,
      statusCode,
      path: request.url,
      message: errorMessage ?? exception.message,
      data: errorMessage ?? {},
    });
  }

  responseHandler(res: Response, context: ExecutionContext): IGenericResponse {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = response.statusCode;

    this.loggerRequest(request, statusCode);

    return {
      error: false,
      statusCode,
      path: request.url,
      message: '',
      data: {},
      ...res,
    };
  }
}
