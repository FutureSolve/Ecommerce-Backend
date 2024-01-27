import { ListResponseDto } from './../../../shared/dtos/responses/list-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './user-response.dto';

export class GetUsersResponseDto extends ListResponseDto {
    @ApiProperty({ type: [UserResponseDto] })
    list: UserResponseDto[];

    constructor(partial: Partial<GetUsersResponseDto>) {
        super();
        Object.assign(this, partial);
    }
}
