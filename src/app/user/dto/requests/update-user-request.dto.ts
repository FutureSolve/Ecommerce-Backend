import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserRequestDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Ahmed' })
    name: string;

    @IsEmail()
    @IsOptional()
    // @ApiProperty({ example: 'ahmed@gmail.com' })
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Ahmed123' })
    password: string;
}
