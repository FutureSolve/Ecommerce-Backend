import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyUserRequestDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '123456' })
    otpId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '123456' })
    otpCode: string;

    @Transform(({ value }) => value.replace(/\s/g, ''))
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '+201122334455' })
    phoneNumber: string;
}
