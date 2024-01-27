import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class ForgetPasswordRequestDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'markyaacoub@gmail.com' })
    email: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: ' https://bikerz.vercel.app/ForgetPassword' })
    directLink: string;
}

export class ChangePasswordRequestDto {
    // @IsEmail()
    // @IsNotEmpty()
    // @ApiProperty({ example: 'markyaacoub@gmail.com' })
    // email: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmt5YWFjb3ViQGdtYWlsLmNvbSIsImlhdCI6MTY5NTg0OTM2NCwiZXhwIjoxNjk1OTM1NzY0fQ.hViNQx5yEU5W6q-fDnQfnryFTxfaiyciTOWQR6av6nI',
    })
    token: string;

    @IsString()
    @Length(6)
    @IsNotEmpty()
    @ApiProperty({ example: 'string' })
    password: string;
}
