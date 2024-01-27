import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { Order } from '../entities/order.entity';
import { UpdateOrderRequestDto } from '../dtos/update-order-req.dto';
import { UserModel } from 'App/user/models/user.model';
import { ProductRepository } from 'App/products/repositories/product-repository';
import { CreateOrderDTO, ProductQuantityDTO } from '../dtos/create-order.dto';
import { OrderProductRepository } from '../repositories/order-products.repository';
import { Connection, In } from 'typeorm';
import { OrderProduct } from '../entities/order-products.entity';
import { User } from 'App/user/entities/user.entity';
import { Product } from 'App/products/entities/product.entity';

@Injectable()
export class OrderService {
    constructor(
        private repository: OrderRepository,
        private productRepository: ProductRepository,
        private orderProductRepository: OrderProductRepository,
        private readonly connection: Connection,
    ) {}
    async getOrders() {
        const Order = await this.repository.find();

        if (!Order) {
            throw new HttpException('Offer Is Not Found', HttpStatus.BAD_REQUEST);
        }
        return Order;
    }

    async createOrder(user: User, orderData: CreateOrderDTO): Promise<Order> {
        let newOrder: Order | null = null;
        await this.connection.transaction(async (transactionalEntityManager) => {
            newOrder = await transactionalEntityManager.save(Order, {
                totalPrice: orderData.totalPrice,
                user: user,
            });
            for (const productData of orderData.products) {
                const product = await transactionalEntityManager.findOne(Product, { where: { id: productData.productId } });
                if (!product) {
                    throw new NotFoundException(`Product with ID ${productData.productId} not found`);
                }
                const orderProduct = await transactionalEntityManager.save(OrderProduct, {
                    product: product,
                    order: newOrder,
                    quantity: productData.quantity,
                });
            }
        });
        // Calculate totalPrice based on products and quantities

        return newOrder;
    }

    // async createOrder(user: any, createOrderDto: CreateOrderDTO): Promise<Order | null> {
    //   try {
    //     const productIds = createOrderDto.products.map(prod => prod.productId);
    //     const products = await this.productRepository.findByIds(productIds);
    //     if (!products || products.length !== productIds.length) {
    //       throw new Error('Some products were not found');
    //     }

    //     let totalPrice = 0;
    //     const productsWithQuantities: ProductQuantityDTO[] = [];

    //     products.forEach(product => {
    //       const productWithQuantity = createOrderDto.products.find(prod => prod.productId === product.id);
    //       const quantity = productWithQuantity ? productWithQuantity.quantity : 1; // Default to 1 if quantity not provided
    //       totalPrice += product.price * quantity; // Calculate total price based on quantity

    //       productsWithQuantities.push({ productId: product.id, quantity }); // Build products with quantities array
    //     });

    //     const order = new Order({
    //       user: user,
    //       totalPrice: totalPrice,
    //       products: products.map(product => {
    //         const productWithQuantity = productsWithQuantities.find(prod => prod.productId === product.id);
    //         const quantity = productWithQuantity ? productWithQuantity.quantity : 1; // Default to 1 if quantity not provided
    //         return { product, quantity };
    //       })
    //     });

    //     const createdOrder = await this.Repository.save(order); // Use orderRepository instead of Repository
    //     return createdOrder;
    //   } catch (error) {
    //     console.error(error);
    //     return null;
    //   }
    // }

    async updateOrder(id: number, userDetails) {
        const Order = this.repository.findOne({ where: { id } });
        return await this.repository.update((await Order).id, userDetails);
    }

    async constructOrderModel(user: any, registerRequest: UpdateOrderRequestDto): Promise<Order> {
        return new Order({
            user: user,
        });
    }

    async saveOrder(user: any, OrderDetails: any): Promise<Order> {
        try {
            const newOrder: Order = await this.constructOrderModel(user, OrderDetails);
            return await this.repository.save(newOrder);
        } catch (error) {
            Logger.error(`Error while saving userModel: ${JSON.stringify(OrderDetails)}`, error);
            throw new InternalServerErrorException('Error while saving user data');
        }
    }

    async markDelete(id: number) {
        await this.repository.softDelete({ id: id });
        return;
    }
}
