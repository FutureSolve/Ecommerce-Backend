import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import * as fs from 'fs';
import * as path from 'path';

const caCertificatePath = path.resolve(__dirname, '../../../ca-certificate.crt');

export const config = registerAs('database', () => ({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    // logging: true,
    entities: ['dist/app/**/entities/**.js'],
    migrations: ['dist/database/migrations/*.js'],
    synchronize: true,
    ssl: JSON.parse(process.env.DB_SSL_ENABLED)
        ? {
              rejectUnauthorized: true,
              ca: fs.readFileSync(caCertificatePath),
          }
        : false,
}));

export const validation = {
    DB_HOST: Joi.string().hostname().required(),
    DB_PORT: Joi.number().port(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string(),
    DB_DATABASE: Joi.string().required(),
};
