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

export class EmailRegisterDto {
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

    @IsNumber({}, { each: true })
    @ArrayUnique()
    @ArrayNotEmpty()
    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ example: [1, 2] })
    lessonIds: number[];

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

    // @IsOptional()
    // @ApiProperty({ example: "{'http://digitalocean.com/profilePhoto'}" })
    // profilePhoto: string;

   

    // @IsString()
    // @ApiProperty({ example: 'en' })
    // language: string;
}
