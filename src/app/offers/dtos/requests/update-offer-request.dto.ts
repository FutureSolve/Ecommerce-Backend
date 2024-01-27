import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateOfferRequestDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'title' })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'desc' })
    desc: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'pic url' })
    cover: string;

}