import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'App/products/entities/product.entity';
import { User } from 'App/user/entities/user.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'order_products' })
export class OrderProduct {
    @PrimaryGeneratedColumn('increment')
    @ApiProperty({ example: 1 })
    id: number;

    @Column({ nullable: false })
    @ApiProperty()
    quantity: number;

    @ManyToOne(() => Product, { cascade: true })
    product: Product;

    @ManyToOne(() => Order, order => order.products, { cascade: true })
    order: Order;

    constructor(partial: Partial<Order>) {
        Object.assign(this, partial);
    }
}
