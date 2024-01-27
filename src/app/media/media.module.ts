import { Module } from '@nestjs/common';
import { MediaController } from './controllers/media.controller';
import { MediaService } from './services/media.service';
import { MediaRepository } from './repositories/media.repository';
import { Media } from './entities/media.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Media])],
    controllers: [MediaController],
    providers: [MediaService, MediaRepository],
    exports: [MediaService, MediaRepository],
})
export class MediaModule {}
