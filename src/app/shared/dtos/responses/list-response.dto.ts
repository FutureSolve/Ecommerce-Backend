import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponseDto } from './pagination-response.dto';

export class ListResponseDto {
    @ApiProperty()
    pagination: PaginationResponseDto;
}
