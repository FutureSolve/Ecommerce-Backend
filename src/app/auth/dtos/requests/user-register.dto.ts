import { ArrayNotEmpty, ArrayUnique, IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, Length, ValidationArguments } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
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
    @Length(8)
    @IsNotEmpty()
    @ApiProperty({ example: '01140114db' })
    password: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '+201122334455' })
    phoneNumber: string;
}
