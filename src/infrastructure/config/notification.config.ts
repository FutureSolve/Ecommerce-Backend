import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const config = registerAs('notification', () => ({
    email: {
        mailgun: {
            domain: process.env.MAILGUN_DOMAIN,
            apiKey: process.env.MAILGUN_API_KEY,
        },
        contactUs: {
            adminEmail: process.env.CONTACT_US_ADMIN_EMAIL,
        },
    },
}));

export const validation = {
    MAILGUN_DOMAIN: Joi.string().required(),
    MAILGUN_API_KEY: Joi.string().required(),
    CONTACT_US_ADMIN_EMAIL: Joi.string().required(),
};
