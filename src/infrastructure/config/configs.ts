import * as Joi from 'joi';
import * as app from './app.config';
import * as database from './database.config';
import * as payment from './payment.config';
import * as fileManager from './file-manager.config';
import * as notification from './notification.config';
import * as search from './search.config';

import * as google from './google.config';
const validationSchema = Joi.object({
    ...app.validation,
    ...database.validation,
    ...payment.validation,
    ...fileManager.validation,
    ...notification.validation,
    ...search.validation,
    ...google.validation,
});

export const configs = {
    load: [app.config, database.config, payment.config, fileManager.config, notification.config, search.config],
    validationSchema,
};
