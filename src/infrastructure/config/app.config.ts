import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const config = registerAs('app', () => ({
    env: process.env.APP_ENV,
    port: parseInt(process.env.APP_PORT, 10) || 80,
    logLevel: process.env.APP_LOG_LEVEL,
    name: process.env.APP_NAME || 'Bikerz App',
    baseUrl: process.env.APP_BASE_URL,
    authSecret: process.env.APP_AUTH_SECRET || 'ZH9ZicBfxT5AAUHKpkXyNKCcxyeiXfmy',
}));

export const validation = {
    APP_ENV: Joi.string().valid('local', 'development', 'production').required(),
    APP_PORT: Joi.number().port(),
    APP_LOG_LEVEL: Joi.string().valid('debug', 'verbose', 'log', 'warn', 'error').required(),
    APP_NAME: Joi.string(),
    APP_BASE_URL: Joi.string().uri().required(),
};
