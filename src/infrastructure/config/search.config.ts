import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const config = registerAs('search', () => ({
    algolia: {
        app_id: process.env.ALGOLIA_APP_ID,
        admin_api_key: process.env.ALGOLIA_ADMIN_API_KEY,
    },
}));

export const validation = {
    ALGOLIA_APP_ID: Joi.string().required(),
    ALGOLIA_ADMIN_API_KEY: Joi.string().required(),
};
