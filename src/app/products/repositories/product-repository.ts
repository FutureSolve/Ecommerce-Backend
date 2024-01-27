
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from '../entities/product.entity';

export class ProductRepository extends Repository< Product> {
    constructor(@InjectRepository(Product) private productRepository: Repository< Product>) {
        super(productRepository.target, productRepository.manager, productRepository.queryRunner);
    }
}
    