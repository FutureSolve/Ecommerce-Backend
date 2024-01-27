import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GetAllByCategory{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'category' })
    category: string;
}