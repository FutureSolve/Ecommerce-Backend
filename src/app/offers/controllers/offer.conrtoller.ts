import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { OfferService } from "../services/offer.service";
import { Offer } from "../entities/offer.entity";
import { UpdateOfferRequestDto } from "../dtos/requests/update-offer-request.dto";

@Controller('api/v1/offer')
@ApiTags("offer")
export class OfferController{
    constructor(
        private offerService: OfferService,
    ){}
    @Get('getAll')
    @ApiOperation({summary:"getAll-Offer"})
    async getAll (){
        return await this.offerService.getOffers()
    }
    @Post('create')
    @ApiOperation({summary:"create-Offer"})
    async create (@Body()offerCreate:UpdateOfferRequestDto){
        return await this.offerService.saveOffer(offerCreate)
    }

    @Post('update/:id')
    @ApiOperation({summary:"create-Offer"})
    async update (@Param('id') offerID: number,@Body()offerCreate:UpdateOfferRequestDto){
        return await this.offerService.updateOfer(offerID,offerCreate)
    }

    @Delete('/delete/:id')
    @ApiOperation({ summary: 'Delete Offer' })
    async deleteUser(@Param('id') offerID: number) {
        await this.offerService.markDelete(offerID);
        return 'Offer Was Deleted Successfully';
    }
}