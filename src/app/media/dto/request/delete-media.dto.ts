import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteMediaDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    id: number;
}
