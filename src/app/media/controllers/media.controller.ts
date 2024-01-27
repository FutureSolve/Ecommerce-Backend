import { Body, Controller, Get, Param, Post, Ip, Delete } from '@nestjs/common';
import { MediaService } from './../services/media.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MediaRequestDto } from '../dto/request/media-request.dto';
import { DeleteMediaDto } from '../dto/request/delete-media.dto';
// import { Request } from 'express';

@Controller('Media')
@ApiTags('Media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @Get(':id')
    @ApiOperation({ summary: 'Get Media By trainer Id.' })
    async getMediaByTrainerId(@Param('id') mediaId: number) {
        return await this.mediaService.getMediaByTrainerId(mediaId);
    }

    @Post()
    @ApiOperation({ summary: 'Create New Media.' })
    async CreateNewMedia(@Body() mediaRequestDto: MediaRequestDto) {
        return await this.mediaService.addMedia(mediaRequestDto);
    }

    @Get('test/ip')
    @ApiOperation({ summary: 'Get Ip Address.' })
    async getIpAddress(@Ip() ip: string) {
        return ip;
    }

    @Delete()
    @ApiOperation({ summary: 'Delete pic by picId' })
    async deleteMediaById(@Body() deleteMediaDto: DeleteMediaDto) {
        await this.mediaService.deleteMediaById(deleteMediaDto.id);
    }
}
