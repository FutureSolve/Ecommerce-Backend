import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { EmailAuthService } from './services/email-auth.service';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './services/auth.service';

@Module({
    imports: [
        InfrastructureModule,
        JwtModule.registerAsync({
            useFactory: (config: ConfigService) => {
                return {
                    global: true,
                    secret: config.get('app.authSecret'),
                } as JwtModuleAsyncOptions;
            },
            inject: [ConfigService],
        }),
    ],
    controllers: [],
    providers: [EmailAuthService, AuthService],
    exports: [JwtModule, AuthService],
})
export class AuthModule {}
