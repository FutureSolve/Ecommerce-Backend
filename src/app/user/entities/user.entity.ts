
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserTypeEnum } from '../enums/user-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, instanceToPlain } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { Order } from 'App/orders/entities/order.entity';

@Entity({ name: 'users' })
export class User {
    
    @PrimaryGeneratedColumn('increment')
    @ApiProperty({ example: 1 })
    id: number;

    @Column({ nullable: false })
    @ApiProperty({ example: 'Ahmed' })
    name: string;

    @Column({ nullable: false })
    @ApiProperty({ example: 'Ahmed@getMaxListeners.com' })
    email: string;

    @Column({ nullable: true })
    @Exclude({ toPlainOnly: true })
    @ApiProperty({ example: 'Hashed password' })
    password: string;

    @Column({ nullable: false })
    @ApiProperty({ example: '011245678520' })
    phone: string;

    @Column({ nullable: false })
    @ApiProperty({ example: '16st' })
    address: string;

    @Column({ nullable: false })
    @ApiProperty({ example: 'alex' })
    city: string;

    @Column({ name: 'is_verified', default: false })
    @IsOptional()
    @ApiProperty({ example: false })
    isVerified: boolean;
    
    @DeleteDateColumn()
    deletedAt: Date; // This column stores the soft delete timestamp

    @Column({ type: 'simple-array', nullable: true, name: 'transactions_ids' })
    transactionsIds: number[];

    @Column({ enum: UserTypeEnum, default: UserTypeEnum.CUSTOMER })
    type: UserTypeEnum;
    
    @OneToMany(() => Order, order => order.user) // Assumes 'user' is the property in the Order entity referring to User
    orders: Order[];

    toJSON() {
        return instanceToPlain(this);
    }

}
