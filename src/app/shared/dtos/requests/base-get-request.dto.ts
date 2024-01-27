import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Max, Min, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BaseGetRequest {
    @Type(() => Number)
    @Min(1)
    @Max(25)
    @IsNumber()
    @IsNotEmpty()
    @ValidateIf((obj) => obj.offset != null)
    @ApiProperty({ example: 10, required: false })
    limit?: number;

    @Type(() => Number)
    @Min(0)
    @IsNumber()
    @IsNotEmpty()
    @ValidateIf((obj) => obj.limit != null)
    @ApiProperty({ example: 0, required: false })
    offset?: number;
}
