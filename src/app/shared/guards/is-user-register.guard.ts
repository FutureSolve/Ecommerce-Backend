import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class IsUserRegister implements CanActivate {
    constructor(private readonly jwtService: JwtService, private config: ConfigService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) return true;
        const payload = await this.validateToken(token);
        request.user = { userId: payload.userId ?? null };

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
            return null;
        }
    }

    private async validateTokenPayload(payload: any) {
        if (!payload.userId || !payload.email) {
            Logger.error(`Invalid token payload: ${payload}`);
            return null;
        }
    }
}
