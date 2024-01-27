import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'App/products/entities/product.entity';
import { User } from 'App/user/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderProduct } from './order-products.entity';

@Entity({ name: 'order' })
export class Order {
    @PrimaryGeneratedColumn('increment')
    @ApiProperty({ example: 1 })
    id: number;

    @Column({ nullable: false ,default:new Date() })
    @ApiProperty({ example: new Date() })
    orderDate: Date;
    
    @Column({ type: "float", nullable: false, default: 0 }) 
    @ApiProperty({ example: 0 })
    totalPrice: number;

    @ManyToOne(() => User, user => user.orders)
    user: User;

    @OneToMany(() => OrderProduct, orderProducts => orderProducts.order)
    products: OrderProduct[];

    constructor(partial: Partial<Order>) {
        Object.assign(this, partial);

    }
}
