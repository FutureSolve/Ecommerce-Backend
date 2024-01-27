import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { EntityPropertyNotFoundError } from 'typeorm';

@Catch(EntityPropertyNotFoundError)
export class EntityPropertyNotFoundFilter<T> implements ExceptionFilter {
    catch(exception: T, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const { message } = exception as EntityPropertyNotFoundError;

        console.error(exception);

        response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message,
        });
    }
}
