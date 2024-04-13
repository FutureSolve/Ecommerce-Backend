import { ReviewsModule } from './app/Reviews/reviews.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './app/auth/auth.module';
import { SharedModule } from './app/shared/shared.module';
import { UserModule } from './app/user/user.module';
import { LocaleMiddleware } from './infrastructure/middlewares/locale.middleware';
import { GoogleAuthModule } from './app/google-auth/google.auth.module';
import { APP_FILTER } from '@nestjs/core';
import { EntityNotFoundExceptionFilter, EntityPropertyNotFoundFilter, QueryExceptionFilter } from './app/shared/exception';
import { OfferModule } from 'App/offers/offer.module';
import { ProductModule } from 'App/products/product.module';
import { OrderModule } from 'App/orders/order.module';
import {PaymentModule} from 'App/payment/payment.module'

@Module({
    imports: [
        ReviewsModule,
        GoogleAuthModule,
        InfrastructureModule,
        DatabaseModule,
        AuthModule,
        SharedModule,
        UserModule,
        OfferModule,
        ProductModule,
        OrderModule,
        PaymentModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: EntityPropertyNotFoundFilter,
        },
        {
            provide: APP_FILTER,
            useClass: QueryExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: EntityNotFoundExceptionFilter,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LocaleMiddleware).forRoutes('*');
    }
}
