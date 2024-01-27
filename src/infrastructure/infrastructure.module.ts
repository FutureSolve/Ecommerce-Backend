import { Module } from '@nestjs/common';
import { APIService } from './api/api.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configs } from './config/configs';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            ...configs,
        }),
        JwtModule.registerAsync({
            useFactory: (config: ConfigService) => {
                return {
                    global: true,
                    secret: config.get('app.authSecret'),
                } as JwtModuleAsyncOptions;
            },
            inject: [ConfigService],
        }),
        HttpModule,
    ],
    exports: [APIService],
    providers: [APIService],
})
export class InfrastructureModule {}
