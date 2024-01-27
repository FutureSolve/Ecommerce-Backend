import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const config = registerAs('fileManager', () => ({
    digitaloceanSpaces: {
        endpoint: process.env.DIGITALOCEAN_SPACES_ENDPOINT,
        accessKeyId: process.env.DIGITALOCEAN_SPACES_ACCESS_KEY_ID,
        secretAccessKey: process.env.DIGITALOCEAN_SPACES_SECRET_ACCESS_KEY,
        bucket: process.env.DIGITALOCEAN_SPACES_BUCKET,
    },
}));

export const validation = {
    DIGITALOCEAN_SPACES_ENDPOINT: Joi.string().required(),
    DIGITALOCEAN_SPACES_ACCESS_KEY_ID: Joi.string().required(),
    DIGITALOCEAN_SPACES_SECRET_ACCESS_KEY: Joi.string().required(),
    DIGITALOCEAN_SPACES_BUCKET: Joi.string().required(),
};
