import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from '../entities/media.entity';

export class MediaRepository extends Repository<Media> {
    constructor(@InjectRepository(Media) private mediaRepository: Repository<Media>) {
        super(mediaRepository.target, mediaRepository.manager, mediaRepository.queryRunner);
    }
}
