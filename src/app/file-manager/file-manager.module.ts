import { InfrastructureModule } from './../../infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { FileManagerService } from './services/file-manager.service';
import { FileManagerController } from './controllers/file-manager.controller';
import { DigitaloceanSpacesCommunicator } from './communicators/digitalocean-spaces.communicator';

@Module({
    imports: [InfrastructureModule],
    providers: [FileManagerService, DigitaloceanSpacesCommunicator],
    controllers: [FileManagerController],
    exports: [FileManagerService],
})
export class FileManagerModule {}
