import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DigitaloceanSpacesCommunicator {
    private s3Client: S3Client;

    constructor(private config: ConfigService) {
        this.s3Client = new S3Client({
            region: 'sgp1',
            endpoint: config.get('fileManager.digitaloceanSpaces.endpoint'),
            forcePathStyle: false,
            credentials: {
                accessKeyId: config.get('fileManager.digitaloceanSpaces.accessKeyId'),
                secretAccessKey: config.get('fileManager.digitaloceanSpaces.secretAccessKey'),
            },
        });
    }

    async uploadFile(file: Express.Multer.File, destination: string) {
        try {
            const bucket = this.config.get('fileManager.digitaloceanSpaces.bucket');
            await this.s3Client.send(
                new PutObjectCommand({
                    Body: file.buffer,
                    Bucket: bucket,
                    Key: destination,
                    ContentType: file.mimetype,
                    ACL: 'public-read',
                }),
            );
            return `https://${bucket}.sgp1.cdn.digitaloceanspaces.com/${destination}`;
        } catch (error) {
            Logger.error(`Error while uploading files to Spaces bucket`, error);
            throw new InternalServerErrorException(`Error while uploading file!`);
        }
    }
}
