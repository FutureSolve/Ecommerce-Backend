import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailLoginRequestDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'john.doe@example.com' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'password' })
    password: string;
}
