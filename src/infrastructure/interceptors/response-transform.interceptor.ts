import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
}

export class ResponseTransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<any>> {
        const statusCode = context.switchToHttp().getResponse().statusCode;
        if (context.switchToHttp().getRequest().originalUrl.indexOf('webhook') > -1) {
            return next.handle();
        }
        return next.handle().pipe(map((data) => ({ statusCode, error: null, data })));
    }
}
