import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDto {
    @ApiProperty({ example: 20 })
    count: number;

    @ApiProperty({ example: 0 })
    offset: number;

    @ApiProperty({ example: false })
    previous: boolean;

    @ApiProperty({ example: true })
    next: boolean;

    constructor(count: number, limit: number, offset: number) {
        this.count = count;
        this.offset = offset;
        this.previous = this.setPrevious(offset);
        this.next = this.setNext(offset, limit);
    }

    setNext(offset: number, limit: number): boolean {
        const totalPages = Math.ceil(this.count / limit);
        return offset + limit < this.count && totalPages > 1;
    }

    setPrevious(offset: number): boolean {
        return offset > 0;
    }
}
