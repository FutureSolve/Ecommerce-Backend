// import { GoogleStrategy } from './google.strategy';
import { Module } from '@nestjs/common';
// import { googleController } from '../google-auth/controller/google.controller';
// import { googleService } from '../google-auth/service/google.service';
// import { ConfigModule } from '@nestjs/config';
// import { UserModule } from '../user/user.module';
// import { AuthModule } from '../auth/auth.module';
// import { EmailAuthService } from '../auth/services/email-auth.service';
// import { TrainerModule } from '../trainer-profile/trainer.module';
@Module({
    // imports: [ConfigModule.forRoot(), UserModule, AuthModule, TrainerModule],
    // controllers: [googleController],
    // providers: [googleService, GoogleStrategy, EmailAuthService],
})
export class GoogleAuthModule {}
