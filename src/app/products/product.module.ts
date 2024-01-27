import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { Product } from "./entities/product.entity";
import { ProductRepository } from "./repositories/product-repository";
import { ProductService } from "./services/product.service";
import { ProductController } from "./controllers/product.controller";

@Module({
    imports: [
        InfrastructureModule,
        TypeOrmModule.forFeature([Product]),
    ],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository],
    exports: [ProductService, ProductRepository],
})
export class ProductModule {}