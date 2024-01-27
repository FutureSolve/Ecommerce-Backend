import { Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags, ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { FileManagerService } from '../services/file-manager.service';
import { UploadFileResponseDto } from '../dtos/responses/upload-file-response.dto';

@Controller('api/v1/file-manager')
export class FileManagerController {
    constructor(private fileManagerService: FileManagerService) {}

    @Post('upload-photo')
    @UseInterceptors(FileInterceptor('file'))
    @ApiTags('Files')
    @ApiOperation({ summary: 'Upload photo' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Upload a file - allowed formats [.jpg, .jpeg, .png, .gif, .HEIF, .MP4, .MOV, .HEVC]',
        type: 'file',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Uploaded file url',
        type: UploadFileResponseDto,
    })
    async uploadPhoto(@UploadedFile() file: Express.Multer.File, @Req() request: any): Promise<UploadFileResponseDto> {
        const fileLink = await this.fileManagerService.uploadFile(request);
        return { url: fileLink };
    }
}
