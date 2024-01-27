import { ArrayNotEmpty, ArrayUnique, IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    id: number;

    @IsNumber({}, { each: true })
    @ArrayUnique()
    @ArrayNotEmpty()
    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ example: [1, 2, 3] })
    lessonIds: number[];

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'en' })
    language: string;
}
