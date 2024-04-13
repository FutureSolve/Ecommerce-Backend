import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class UserAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService, private config: ConfigService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }
        const payload = await this.validateToken(token);
        request['user'] = payload;
        await this.validateTokenPayload(payload);
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private async validateToken(token: string) {
        try {
            return await this.jwtService.verifyAsync(token, {
                secret: this.config.get('app.authSecret'),
            });
        } catch {
            throw new UnauthorizedException();
        }
    }

    private async validateTokenPayload(payload: any) {
        if (!payload.id || !payload.email) {
            Logger.error(`Invalid token payload: ${payload}`);
            throw new UnauthorizedException();
        }
    }
}
