import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';

import { EntityNotFoundError, QueryFailedError } from 'typeorm';

@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let { message } = exception as QueryFailedError;

        /**
         * a regex to get the entity name from the message string
         */
        const regex = /(?<=type\s+).*?(?=\s+matching)/gs;

        const entity = message.match(regex)[0].split('"')[1];

        response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: `${entity} not found`,
        });
    }
}
