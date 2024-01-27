import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LocaleMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const defaultLanguage = 'en';
        const headerLanguage = req.headers['accept-language'];
        const availableLanguages = ['ar', 'en'];
        if (!headerLanguage || !availableLanguages.includes(headerLanguage)) {
            req.headers['accept-language'] = defaultLanguage;
        }
        next();
    }
}
