// create-order.dto.ts

import { IsArray, IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductQuantityDTO {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  productId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;
}

export class CreateOrderDTO {
  @IsNotEmpty()
  @ApiProperty()
  totalPrice: number;
 
  @IsArray()
  @IsNotEmpty()
  
  @ApiProperty({
    example: [{ productId: 1, quantity: 10 }, { productId: 2, quantity: 15 }],
    description: 'Array of products with their quantities',
    type: [ProductQuantityDTO],
  })
  products: ProductQuantityDTO[];
  // Add other fields as required, such as payment details, shipping address, etc.
}