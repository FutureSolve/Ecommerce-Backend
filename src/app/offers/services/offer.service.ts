import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { OfferRepository } from "../repositories/offer.repository";
import { Offer } from "../entities/offer.entity";
import { UpdateOfferRequestDto } from "../dtos/requests/update-offer-request.dto";

@Injectable()
export class OfferService{
constructor(
    private offerRepository:OfferRepository,
){}
async getOffers() {
    const Offer = await this.offerRepository.find( );

    if (!Offer) {
        throw new HttpException('Offer Is Not Found', HttpStatus.BAD_REQUEST);
    }
    return Offer;
} 

async updateOfer(id: number, userDetails: UpdateOfferRequestDto) {
    const offer = this.offerRepository.findOne({ where: { id } });
    return await this.offerRepository.update((await offer).id, userDetails);
}


async constructOfferModel(registerRequest: UpdateOfferRequestDto): Promise<Offer> {
    return new Offer({
       title: registerRequest.title,
        desc: registerRequest.desc,
       cover: registerRequest.cover
    });
}

async saveOffer(offerDetails): Promise<Offer> {
    try {
       
        const newOffer:Offer = await this.constructOfferModel(offerDetails);
        return await this.offerRepository.save(newOffer);
    } catch (error) {
        Logger.error(`Error while saving userModel: ${JSON.stringify(offerDetails)}`, error);
        throw new InternalServerErrorException('Error while saving user data');
    }
}


async markDelete(id: number) {
    await this.offerRepository.softDelete({ id:id });
    return;
}
}