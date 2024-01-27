import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
export class UpdateProductRequestDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'title' })
    discount: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'desc' })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'pic url' })
    cover: string;


    @IsNotEmpty()
    @ApiProperty({ example: 20 })
    price: number;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'pic url' })
    category: string;
    
}