import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StringTranslationRequestDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'عنوان' })
    ar: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Title' })
    en: string;
}
