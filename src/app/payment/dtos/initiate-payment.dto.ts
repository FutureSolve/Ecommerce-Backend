import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class InitiatePaymentDto {
    @ApiProperty()
    @IsNumber()
    @Min(1)
    amount: number;

    @ApiPropertyOptional({example: 'EGP'})
    @IsOptional()
    @IsString()
    currency: string = 'EGP';
}
