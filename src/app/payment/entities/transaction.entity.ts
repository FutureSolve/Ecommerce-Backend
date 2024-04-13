// transaction.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'Transactions'})
export class Transaction {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userId: number;

  @Column()
  transactionId: string;

  @Column()
  amount: number;

  @Column()
  currency: string;

  @Column()
  status: string;

  constructor(partial: Partial<Transaction>) {
    Object.assign(this, partial);
}
}
