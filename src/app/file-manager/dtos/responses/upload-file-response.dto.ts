import { ApiProperty } from '@nestjs/swagger';

export class UploadFileResponseDto {
    @ApiProperty({ example: 'https://example.com/path-to-file' })
    url: string;

    constructor(partial: Partial<UploadFileResponseDto>) {
        Object.assign(this, partial);
    }
}
