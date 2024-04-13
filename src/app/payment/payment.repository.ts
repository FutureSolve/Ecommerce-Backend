
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';


export class TransactionRepository extends Repository<Transaction> {
    constructor(@InjectRepository(Transaction) private transactionRepository: Repository<Transaction>) {
        super(transactionRepository.target, transactionRepository.manager, transactionRepository.queryRunner);
    }

}
