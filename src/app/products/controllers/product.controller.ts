import { Body, Controller, Delete, Get, Param, Query, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ProductService } from "../services/product.service";
import { UpdateProductInput } from "aws-sdk/clients/servicecatalog";
import { UpdateProductRequestDto } from "../dtos/update-product-request.dto";
import { GetAllByCategory } from "../dtos/getAll-product-by-category.dto";

@Controller('api/v1/Product')
@ApiTags("Product")
export class ProductController{
    constructor(
        private productService: ProductService,
    ){}
    @Get('getAll')
    @ApiOperation({summary:"getAll-product"})
    async getAll (){
        return await this.productService.getProducts()
    }
    @Get('getAllByCategory/:category') 
    @ApiOperation({ summary: "getAll-product-by-category" })
    async getAllByCategory(@Param('category') product:string) {
        console.log(`Received request for category: ${product}`);
        return await this.productService.getProductsByCategory(product);
    }
    
    @Post('create')
    @ApiOperation({summary:"create-product"})
    async create (@Body()productCreate:UpdateProductRequestDto){
        console.log(UpdateProductRequestDto)
        return await this.productService.saveProduct(productCreate)
    }

    @Post('update/:id')
    @ApiOperation({summary:"create-product"})
    async update (@Param('id') productID: number,@Body()productCreate:UpdateProductRequestDto){
        return await this.productService.updateProduct(productID,productCreate)
    }

    @Delete('/delete/:id')
    @ApiOperation({ summary: 'Delete product' })
    async deleteUser(@Param('id') productID: number) {
        await this.productService.markDelete(productID);
        return 'Offer Was Deleted Successfully';
    }

    @Get(':search')
    async searchByNameOrDescription(@Query('query') query: string) {
        return this.productService.searchByNameOrDescription(query);
    }
}