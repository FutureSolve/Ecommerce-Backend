import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProduct } from '../entities/order-products.entity';

export class OrderProductRepository extends Repository<OrderProduct> {
    constructor(@InjectRepository(OrderProduct) private orderProductRepository: Repository<OrderProduct>) {
        super(orderProductRepository.target, orderProductRepository.manager, orderProductRepository.queryRunner);
    }
}
