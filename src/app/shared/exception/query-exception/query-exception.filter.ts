import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { camelCase } from 'lodash';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let { message } = exception as QueryFailedError;
        let responseMessage = message;

        console.warn(
            '🚀 ~ file: foreign-key-exception.filter.ts:12 ~ QueryExceptionFilter ~ exception.driverError ~ ErrorCode:',
            exception.driverError.code,
        );

        console.error('🚀 ~ file: foreign-key-exception.filter.ts:11 ~ ForeignKeyExceptionFilter ~ message:', message);

        console.error('🚀 ~ file: foreign-key-exception.filter.ts:12 ~ ForeignKeyExceptionFilter ~ exception:', exception);

        const regex = /Key \((.*?)\)=\((.*?)\)/;

        const match = exception['detail']?.match(regex) || null;

        const key = match ? match[1] : null;
        const value = match ? match[2] : null;

        switch (exception.driverError.code) {
            case '23505' /* unique_violation */:
                responseMessage = `Value ${value} for ${camelCase(key)} already exists`;
                break;
            case '23503' /* foreign_key_violation */:
                responseMessage = `Value ${value} for ${camelCase(key)} does not exist`;
                break;
            case '23502' /* not_null_violation */:
                responseMessage = `${camelCase(exception.driverError.column)} is required and cannot be null`;
                break;
            case '22P02' /* invalid_text_representation */:
                responseMessage = `${camelCase(exception.driverError.column)} is invalid`;
                break;
            case '42703' /* undefined_column */:
                responseMessage = `${camelCase(exception.driverError.column)} is invalid`;
                break;
            case '23514' /* check_violation */:
                responseMessage = `${camelCase(exception.driverError.column)} is invalid`;
                break;

            default:
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Internal Server Error',
                });
        }

        return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: responseMessage,
        });
    }
}
