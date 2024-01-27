import {
    ArrayNotEmpty,
    ArrayUnique,
    IsArray,
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Length,
    ValidationArguments,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterBundleDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'John James' })
    name: string;

    @IsEmail(
        {},
        {
            message: (args: ValidationArguments) => {
                return `${args.property} is not in valid format!`;
            },
        },
    )
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'johnJames@example.com' })
    email: string;

    @IsString()
    @Length(6)
    @IsNotEmpty()
    @ApiProperty({ example: 'string' })
    password: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '+201122334455' })
    phoneNumber: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    bundleId: number;

    // @IsOptional()
    // @IsObject()
    // @ApiProperty({ example: { key: 'value' } })
    // quizData: Record<string, any>;

    @IsOptional()
    @ApiProperty({ example: 'access_token_here' })
    accessToken?: string;

    @IsOptional()
    @ApiProperty({ example: 'refresh_token_here' })
    refreshToken?: string;

    @IsOptional()
    @ApiProperty({ example: { facebook: 'http://facebook.com', linkedin: 'http://linkedIn.com' } })
    socialMediaAccounts: string;

    @IsOptional()
    @ApiProperty({ example: "{'http://digitalocean.com/profilePhoto'}" })
    profilePhoto: string;

    @IsOptional()
    // @ApiProperty({ example: 1 })
    locationId: number;

    @IsOptional()
    // @ApiProperty({ example: '102.42.135.239' })
    ipAddress: string;

    @IsString()
    @ApiProperty({ example: 'en' })
    language: string;
}
