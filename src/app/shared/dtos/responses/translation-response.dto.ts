import { ApiProperty } from '@nestjs/swagger';

export class TranslationResponseDto {
    @ApiProperty({ example: 'عربى' })
    ar: any;

    @ApiProperty({ example: 'English' })
    en: any;
    constructor(partial: Partial<TranslationResponseDto>) {
        Object.assign(this, partial);
    }
}
