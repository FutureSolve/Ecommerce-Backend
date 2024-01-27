import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ConfigService } from '@nestjs/config';
import { ResponseTransformInterceptor } from './infrastructure/interceptors/response-transform.interceptor';
import { TrimPipe } from './infrastructure/pipes/trim.pipe';
import { ValidationError } from 'class-validator';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import { initializeTransactionalContext } from 'typeorm-transactional';
//import RemovePrefixMiddleware from './infrastructure/middlewares/remove-prefix.middleware';

async function bootstrap() {
    /**
     * Initialize transactional context for typeorm transaction support in services
     */
    initializeTransactionalContext();

    const app = await NestFactory.create(AppModule);
    const configService = app.select(InfrastructureModule).get(ConfigService);
    app.useGlobalPipes(new TrimPipe());
    app.use(express.json({ limit: '100mb' }));
    app.use(express.urlencoded({ extended: true, limit: '100mb' }));

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            stopAtFirstError: true,
            exceptionFactory: (errors: ValidationError[]) => {
                let validationErrors = [];
                errors.forEach((error) => {
                    const fieldErrors = getErrorMessageFromValidationError(error, error.property);
                    validationErrors = [...validationErrors, ...fieldErrors];
                });
                throw new UnprocessableEntityException(validationErrors);
            },
        }),
    );
    //const removePrefixMiddleware = new RemovePrefixMiddleware();
    //app.use(removePrefixMiddleware.use.bind(removePrefixMiddleware));
    //app.setGlobalPrefix('api/v1');
    app.useGlobalInterceptors(new ResponseTransformInterceptor());
    app.use('/public', express.static('public'));
    const config = new DocumentBuilder()
        .setTitle(configService.get('app.name'))
        .setDescription('Bikerz website')
        .setVersion('1.0')
        .addServer(`http://localhost:${configService.get('app.port')}`)
        .addServer(configService.get('app.baseUrl'))
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    app.enableCors();
    await app.listen(configService.get('app.port'));
}

function getErrorMessageFromValidationError(error: ValidationError, parentProperty: string) {
    const fieldErrors = [];
    if (error.children.length) {
        let childrenErrors = [];
        error.children.forEach((child) => {
            const childProp = `${parentProperty}.${child.property}`;
            const err = getErrorMessageFromValidationError(child, childProp);
            childrenErrors = [...childrenErrors, ...err];
        });
        return childrenErrors;
    }
    if (error.constraints) {
        Object.keys(error.constraints).map((item) => {
            if (item == 'isNotEmpty') {
                error.constraints[item] = `${error.property} is required!`;
            }
        });
        Object.values(error.constraints).forEach((message) => {
            const item = {};
            const prop = `${parentProperty}`;
            item[prop] = message;
            fieldErrors.push(item);
        });
        return fieldErrors;
    }
}
bootstrap();
