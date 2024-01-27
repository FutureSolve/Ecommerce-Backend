import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { Order } from "./entities/order.entity";
import { OrderController } from "./controllers/order.controller";
import { OrderService } from "./services/order.service";
import { OrderRepository } from "./repositories/order.repository";
import { UserService } from "App/user/services/user.service";
import { UserAuthGuard } from "App/shared/guards/user-auth.guard";
import { AuthModule } from "App/auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "App/user/user.module";
import { ProductModule } from "App/products/product.module";
import { OrderProductRepository } from "./repositories/order-products.repository";
import { OrderProduct } from "./entities/order-products.entity";


@Module({
    imports: [
        InfrastructureModule,
        TypeOrmModule.forFeature([Order, OrderProduct]),
        AuthModule,
        UserModule,
        ProductModule,
    ],
    controllers: [OrderController],
    providers: [OrderService, OrderRepository, OrderProductRepository],
    exports: [OrderService, OrderRepository, OrderProductRepository],
})
export class OrderModule {}