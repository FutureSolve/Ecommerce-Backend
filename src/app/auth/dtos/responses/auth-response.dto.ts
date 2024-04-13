import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
    @ApiProperty({ example: '1' })
    userId: number;

    @ApiProperty({ example: 'John Doe' })
    name: string;

    @ApiProperty({ example: 'JohnDoe@gmail.com' })
    email: string;

    @ApiProperty({ example: 'user bio' })
    user_info: string;

    @ApiProperty({ example: '01281151982' })
    phone: string;

    @ApiProperty({ example: '**********' })
    token: string;

    @ApiProperty({ example: '**********' })
    refreshToken: string;

    @ApiProperty({ example: true })
    isVerified: boolean;

    constructor(partial: Partial<AuthResponseDto>) {
        Object.assign(this, partial);
    }
}
