import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength, ValidationArguments } from 'class-validator';

export class CreateUsersRequestDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Ahmed' })
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
    @ApiProperty({
        description: 'Password for Authorized User, Strong Ones only accepted ..',
        type: String,
    })
    @IsNotEmpty()
    @MinLength(6)
    password: string;


    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '16st' })
    address: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'alex' })
    city: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '01246858200' })
    phone: string;



    
}
