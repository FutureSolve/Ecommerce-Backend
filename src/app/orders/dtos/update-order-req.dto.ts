import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class Product {
    // Define properties for your product here
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    quantity: number;
}

export class UpdateOrderRequestDto {
    @IsNotEmpty()
    @ApiProperty()
    totalPrice: number;

    @IsNotEmpty()
    @ApiProperty({ example: [{ name: 'Product A', quantity: 10 }, { name: 'Product B', quantity: 15 }] })
    products: Product[];
}
