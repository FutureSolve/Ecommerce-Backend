import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { MediaTypeEnum } from '../../enums/media-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class MediaRequestDto {
    @IsString()
    @ApiProperty({ example: 'Media 1' })
    caption: string;

    @ApiProperty({ example: MediaTypeEnum.IMAGE })
    mediaType: MediaTypeEnum;

    @IsString()
    @ApiProperty({ example: 'http://example.com/image.jpg' })
    mediaURL: string;

    @IsString()
    @ValidateIf((val) => val.mediaType === MediaTypeEnum.VIDEO)
    @ApiProperty({ example: 'http://example.com/Thumbnail_image.jpg' })
    thumbnail: string;

    @IsString()
    @ApiProperty({ example: 'Media 1' })
    alt: string;

    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    trainerId: number;
}
