// // remove-prefix.middleware.ts

// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class RemovePrefixMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     if (req.url.startsWith('/api/v1/auth/google-redirect')) {
//       req.url = req.url.replace('/api/v1', '');
//     }
//     next();
//   }
// }
// export default RemovePrefixMiddleware;
