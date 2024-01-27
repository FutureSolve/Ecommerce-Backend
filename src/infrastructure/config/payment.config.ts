import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const config = registerAs('payment', () => ({
    tap: {
        baseUrl: process.env.TAP_BASE_URL,
        merchantId: process.env.TAP_MERCHANT_ID,
        authToken: process.env.TAP_AUTH_TOKEN,
        redirectUrl: process.env.TAP_REDIRECT_URL,
        postUrl: process.env.TAP_POST_URL,
    },
}));

export const validation = {
    TAP_BASE_URL: Joi.string().required(),
    TAP_AUTH_TOKEN: Joi.string().required(),
    TAP_MERCHANT_ID: Joi.string().required(),
    TAP_REDIRECT_URL: Joi.string().required(),
    TAP_POST_URL: Joi.string().required(),
};
