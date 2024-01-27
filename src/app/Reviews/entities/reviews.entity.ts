import { User } from 'src/app/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reviews')
export class Reviews {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { name: 'description', length: 150 })
    description: string;

    @Column('int', { name: 'rate' })
    rate: number;

    @Column('int', { name: 'customer_id' })
    customer_id: number;

    @Column('int', { name: 'trainer_id', nullable: true })
    trainer_id: number;

    @Column('int', { name: 'lesson_id' })
    lesson_id: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user)
    @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
    user: User;

}
