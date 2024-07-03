import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
  SetMetadata,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  statusCode: HttpStatus;
  message?: string;
  metadata?: T;
}

/**
 * Decorator to set custom response message.
 * @param message The custom response message.
 */
export const ResponseMessage = (message: string) => {
  return SetMetadata('response_message', message);
};

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((metadata: any) => this.responseHandler(metadata, context)));
  }

  /**
   * Handles the response by adding custom message and wrapping it into standard response format.
   * @param res The original response data.
   * @param context The execution context containing request and response objects.
   * @returns A standardized response object.
   */
  responseHandler<T>(metadata: T, context: ExecutionContext): Response<T> {
    const ctx = context.switchToHttp();
    const statusCode = ctx.getResponse().statusCode;

    return {
      statusCode,
      message:
        Reflect.getMetadata('response_message', context.getHandler()) ||
        'Successfully',
      metadata: metadata,
    };
  }
}
