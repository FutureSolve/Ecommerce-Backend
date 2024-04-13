// transaction.service.ts
import { Injectable } from '@nestjs/common';

import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './payment.repository';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async createTransaction(userId: number, transactionId: string, amount: number, currency: string, status: string): Promise<Transaction> {
    const newTransaction = this.transactionRepository.create({ userId, transactionId, amount, currency, status });
    return await this.transactionRepository.save(newTransaction);
  }

  async getTransactionByTransactionId(transactionId: string): Promise<Transaction | undefined> {
    return await this.transactionRepository.findOne({where:{ transactionId:transactionId }});
  }

  async updateTransactionStatus(transactionId: number, status: string): Promise<void> {
    await this.transactionRepository.update( transactionId , { status });
  }
}
