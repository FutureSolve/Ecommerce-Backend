// payment.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { Transaction } from 'App/payment/entities/transaction.entity'; // Adjust the import path as per your project structure
import { UserService } from 'App/user/services/user.service'; // Adjust the import path as per your project structure
import { TransactionService } from './transaction.service';
import { PaymentService } from './payment.service';
import { UserRepository } from 'App/user/repositories/user.repository'; // Adjust the import path as per your project structure
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'App/user/user.module';
import { TransactionRepository } from './payment.repository';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [
    InfrastructureModule,
    TypeOrmModule.forFeature([Transaction]),UserModule
  ],
  controllers: [PaymentController],
  providers: [
    TransactionService,
    TransactionRepository,
    PaymentService,
    JwtService,
  ],
})
export class PaymentModule {}
