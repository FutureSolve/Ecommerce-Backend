import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const config = registerAs('google', () => ({
    auth: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
}));

export const validation = {
    GOOGLE_CLIENT_ID: Joi.string().required(),
    GOOGLE_CLIENT_SECRET: Joi.string().required(),
};
