import { InfrastructureModule } from './../../infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { OfferService } from './services/offer.service';
import { OfferRepository } from './repositories/offer.repository';
import { OfferController } from './controllers/offer.conrtoller';

@Module({
    imports: [
        InfrastructureModule,
        TypeOrmModule.forFeature([Offer]),
    ],
    controllers: [OfferController],
    providers: [OfferService, OfferRepository],
    exports: [OfferService, OfferRepository],
})
export class OfferModule {}
