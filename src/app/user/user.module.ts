import { InfrastructureModule } from './../../infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { AuthModule } from '../auth/auth.module';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';

@Module({
    imports: [
        InfrastructureModule,
        TypeOrmModule.forFeature([User]),
        AuthModule,
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
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService, UserRepository],
})
export class UserModule {}
