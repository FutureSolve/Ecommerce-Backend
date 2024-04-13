import * as Joi from 'joi';
import * as app from './app.config';
import * as database from './database.config';

import * as google from './google.config';
const validationSchema = Joi.object({
    ...app.validation,
    ...database.validation,
    ...google.validation,
});

export const configs = {
    load: [app.config, database.config],
    validationSchema,
};
