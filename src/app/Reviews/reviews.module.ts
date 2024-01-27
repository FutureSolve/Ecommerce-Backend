import { Module } from '@nestjs/common';
import { ReviewsService } from './services/reviews.service';
import { ReviewsController } from './controllers/reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reviews } from './entities/reviews.entity';
import { ReviewsRepository } from './repositories/reviews.repo';

@Module({
    imports: [TypeOrmModule.forFeature([Reviews])],
    controllers: [ReviewsController],
    providers: [ReviewsService, ReviewsRepository],
    exports: [ReviewsService, ReviewsRepository],
})
export class ReviewsModule {}
