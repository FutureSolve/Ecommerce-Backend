// payment.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InitiatePaymentDto } from './dtos/initiate-payment.dto';
import { CurrentUser } from 'App/shared/decorators/current-user.decorator';
import { UserAuthGuard } from 'App/shared/guards/user-auth.guard';
@Controller('api/v1/payment')
@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post('initiate')
    @ApiBearerAuth()
    @UseGuards(UserAuthGuard)
    async initiatePayment(@Body() paymentData: InitiatePaymentDto, @CurrentUser('id') userId: number): Promise<any> {
        console.log("...............",userId)
        const paymentLink = await this.paymentService.initiatePayment(userId, paymentData);
        return { paymentLink };
    }

    @Post('callback')
    async handlePaymentCallback(@Body() callbackData: any): Promise<any> {
        return await this.paymentService.handlePaymentCallback(callbackData);
    }
}
