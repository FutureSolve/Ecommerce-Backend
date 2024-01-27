import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'App/orders/entities/order.entity';


export class UserResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Ahmed' })
    name: string;

    @ApiProperty({ example: 'ahmed@gmail.com' })
    email: string;

    @ApiProperty({ example: true })
    isVerified: boolean;

    @ApiProperty({ type: () => [Order] }) // Assuming Order is properly defined as a DTO
    orders: Order[];

    constructor(id: number, name: string,email:string,isVerified:boolean, orders: Order[]) {
        this.id = id;
        this.name = name;
        this.email=email;
        this.isVerified =isVerified;
        this.orders = orders;
    }
}
