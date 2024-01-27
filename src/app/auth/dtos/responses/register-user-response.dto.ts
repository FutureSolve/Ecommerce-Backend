import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'John James' })
    name: string;

    @ApiProperty({ example: 'johnJames@example.com' })
    email: string;

    @ApiProperty({ example: '+201122334455' })
    phoneNumber: string;

    constructor(partial: Partial<RegisterUserResponseDto>) {
        Object.assign(this, partial);
    }
}
