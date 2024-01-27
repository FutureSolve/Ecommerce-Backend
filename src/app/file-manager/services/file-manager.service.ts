import { DigitaloceanSpacesCommunicator } from '../communicators/digitalocean-spaces.communicator';
import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileManagerService {
    constructor(private config: ConfigService, private digitaloceanSpacesCommunicator: DigitaloceanSpacesCommunicator) {}

    async uploadFile(request: any, allowedFormats?: string[]): Promise<any> {
        let defaultFormats = ['.jpg', '.jpeg', '.png', '.gif', '.heif', '.mp4', '.mov', '.hevc'];

        if (allowedFormats) {
            defaultFormats = allowedFormats;
        }

        const file = request.file;

        if (!file) {
            throw new BadRequestException('No file uploaded');
        }

        if (!defaultFormats.some((format) => file.originalname.endsWith(format))) {
            throw new BadRequestException('Invalid file format');
        }

        const fileName: string = uuidv4();
        const extension: string = path.parse(file.originalname).ext;
        const filePath: string = 'uploads/' + fileName + extension;
        const uploadResponse = await this.digitaloceanSpacesCommunicator.uploadFile(file, filePath);
        console.log('Digital ocean: ', uploadResponse);
        extension;
        return uploadResponse;
    }
}
