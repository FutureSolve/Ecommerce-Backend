import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'App/orders/entities/order.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'product' })
export class Product {
    @PrimaryGeneratedColumn('increment')
    @ApiProperty({ example: 1 })
    id: number;

    @Column({ nullable: false })
    @ApiProperty({ example: '20%' })
    discount: string;

    @Column({ nullable: false })
    @ApiProperty({ example: 'pic url' })
    cover: string;

    @Column({ nullable: false })
    @ApiProperty({ example: 'name' })
    name: string;

    @Column({ nullable: false })
    @ApiProperty({ example: 200 })
    price: number;

    @Column({ nullable: false })
    @ApiProperty({ example: 'name' })
    category: string;

    constructor(partial: Partial<Product>) {
        Object.assign(this, partial);
    }
}
