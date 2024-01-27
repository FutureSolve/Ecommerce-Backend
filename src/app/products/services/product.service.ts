import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { ProductRepository } from "../repositories/product-repository";
import { UpdateProductRequestDto } from "../dtos/update-product-request.dto";

@Injectable()
export class ProductService{
constructor(
    private Repository:ProductRepository,
){}
async getProducts() {
    const Product = await this.Repository.find( );

    if (!Product) {
        throw new HttpException('Offer Is Not Found', HttpStatus.BAD_REQUEST);
    }
    return Product;
} 

async getProductsByCategory(category:string) : Promise<Product[]>{
console.log(category)
    try {
        const products = await this.Repository.find({ where: { category } });

        if (!products || products.length === 0) {
            throw new HttpException('No Products Found for the Category', HttpStatus.NOT_FOUND);
        }
        
        return products;
    } catch (error) {
        throw new HttpException('Error retrieving products', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


async updateProduct(id: number, userDetails: UpdateProductRequestDto) {
    const Product = this.Repository.findOne({ where: { id } });
    return await this.Repository.update((await Product).id, userDetails);
}


async constructProductModel(registerRequest: UpdateProductRequestDto): Promise<Product> {
    return new Product({
        discount: registerRequest.discount,
       cover: registerRequest.cover,
        name: registerRequest.name,
        price: registerRequest.price,
        category: registerRequest.category
    });
}

async saveProduct(productDetails:any): Promise<Product> {
    try {
        console.log(productDetails)
        const newProduct:Product = await this.constructProductModel(productDetails);
        console.log(newProduct)
        return await this.Repository.save(newProduct);
    } catch (error) {
        Logger.error(`Error while saving userModel: ${JSON.stringify(productDetails)}`, error);
        throw new InternalServerErrorException('Error while saving user data');
    }
}


async markDelete(id: number) {
    await this.Repository.softDelete({ id:id });
    return;
}
}