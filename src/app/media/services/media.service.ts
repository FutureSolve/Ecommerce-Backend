import { Injectable } from '@nestjs/common';
import { MediaRepository } from './../repositories/media.repository';
import { MediaRequestDto } from '../dto/request/media-request.dto';
import { BaseGetRequest } from 'src/app/shared/dtos/requests/base-get-request.dto';

@Injectable()
export class MediaService {
    constructor(private readonly mediaRepository: MediaRepository) {}

    async getMediaByTrainerId(trainerId: number, baseGetRequest?: BaseGetRequest) {
        if (!baseGetRequest) {
            baseGetRequest = { limit: 3, offset: 0 };
        }
        const { limit, offset } = baseGetRequest;
        // const query = await this.mediaRepository.find({
        //     where: { trainerId: trainerId },
        //     take: limit,
        //     skip: offset,
        //     select: {
        //         caption: true,
        //         mediaType: true,
        //         mediaURL: true,
        //         thumbnail: true,
        //     },
        // });
        return ;
        //query;
    }
    async deleteMediaById(picId: number) {
        await this.mediaRepository.delete(picId);
    }

    async addMedia(mediaDto: MediaRequestDto) {
        console.log(mediaDto);
        return await this.mediaRepository.save(mediaDto);
    }
}
