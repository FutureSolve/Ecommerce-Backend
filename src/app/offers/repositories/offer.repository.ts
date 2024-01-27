import { Repository } from "typeorm";
import { Offer } from "../entities/offer.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class OfferRepository extends Repository<Offer> {
    constructor(@InjectRepository(Offer) private offerRepository: Repository<Offer>) {
        super(offerRepository.target, offerRepository.manager, offerRepository.queryRunner);
    }
}