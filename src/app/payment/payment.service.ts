// payment.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserService } from '../user/services/user.service';
import { TransactionService } from './transaction.service';
import { User } from 'App/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { InitiatePaymentDto } from './dtos/initiate-payment.dto';

@Injectable()
export class PaymentService {
    constructor(
        private readonly userService: UserService,
        private readonly transactionService: TransactionService,
        private readonly configService: ConfigService,
    ) {}

    async initiatePayment(userId: number, paymentData: InitiatePaymentDto) {
        try {
            const { amount, currency } = paymentData;
            const user = await this.userService.findUser({ id: userId });

            const PAYMOB_SECRET_KEY = this.configService.get<string>('PAYMOB_SECRET_KEY');
            const PAYMOB_PUBLIC_KEY = this.configService.get<string>('PAYMOB_PUBLIC_KEY');
            const PAYMOB_INTEGRATION = +this.configService.get<number>('PAYMOB_INTEGRATION');

            const paymentRequest = await axios.post(
                'https://accept.paymob.com/v1/intention/',
                {
                    amount: amount * 100,
                    currency,
                    payment_methods: ['card', PAYMOB_INTEGRATION],
                    billing_data: {
                        first_name: user.name,
                        last_name: '.',
                        phone_number: user.phone,
                        email: user.email,
                    },
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${PAYMOB_SECRET_KEY}`,
                    },
                },
            );

            const transaction = await this.transactionService.createTransaction(
                userId,
                paymentRequest.data.id,
                amount,
                currency,
                'pending',
            );

            const paymentLink = `https://accept.paymob.com/unifiedcheckout/?publicKey=${PAYMOB_PUBLIC_KEY}&clientSecret=${paymentRequest.data.client_secret}`;

            return paymentLink;
        } catch (error) {
            console.log(error);
        }
    }
    async handlePaymentCallback(req: any): Promise<any> {
        try {
            const { id, success, error_occurred } = req.body.transaction;
            const status = success && !error_occurred ? 'success' : 'failure';

            const oldTransaction = await this.transactionService.getTransactionByTransactionId(req.body.intention.id);
            if (!oldTransaction) {
                throw new Error('Transaction not found');
            }

            await this.transactionService.updateTransactionStatus(oldTransaction.id, status);

            console.log(`Payment successful for transaction ID: ${id}`);
            return { message: 'Payment callback received and processed successfully' };
        } catch (error) {
            console.error('Error handling payment callback:', error.message);
            throw new Error('Error handling payment callback');
        }
    }
}
