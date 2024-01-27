import { UserTypeEnum } from '../../user/enums/user-type.enum';
import { UserService } from '../../user/services/user.service';
import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private userService: UserService, private readonly jwtService: JwtService, private config: ConfigService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        const payload = await this.validateToken(token);
        await this.validateTokenPayload(payload);
        if (payload.userType != UserTypeEnum.ADMIN) {
            throw new UnauthorizedException('Non admin user can not perform this action!');
        }
        request['user'] = payload;
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
        if (!payload.userId || !payload.email || !payload.userType) {
            Logger.error(`Invalid token payload: ${payload}`);
            throw new UnauthorizedException();
        }
        const user = await this.userService.getUserById(payload.userId);
        if (!user) {
            Logger.error(`Invalid userId from token payload: ${payload.userId}`);
            throw new UnauthorizedException();
        }
    }
}
