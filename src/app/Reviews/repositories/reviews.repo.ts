import { EntityRepository, Repository } from 'typeorm';
import { Reviews } from '../entities/reviews.entity';
import { reviewsRequestDto } from '../dto/reviews.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GetReviewRequestDto } from '../dto/get-review-request.dto';
import { BaseGetRequest } from 'src/app/shared/dtos/requests/base-get-request.dto';

export class ReviewsRepository extends Repository<Reviews> {
    constructor(@InjectRepository(Reviews) private ReviewsRepository: Repository<Reviews>) {
        super(ReviewsRepository.target, ReviewsRepository.manager, ReviewsRepository.queryRunner);
    }
    async getAllAverageReviewBasedLessonId(lessonId: number): Promise<any> {
        const reviews = await this.ReviewsRepository.createQueryBuilder('review')
            .select('COUNT(review.id)', 'reviewCount')
            .addSelect('ROUND(AVG(review.rate), 2)', 'averageRate')
            .where('review.lesson_id = :lessonId', { lessonId })
            .getRawOne();

        return reviews;
    }

    async getAllAverageReviewBasedTrainerId(TrainerId: number): Promise<any> {
        const reviews = await this.ReviewsRepository.createQueryBuilder('review')
            .select('COUNT(review.id)', 'reviewCount')
            .addSelect('ROUND(AVG(review.rate), 2)', 'averageRate')
            .where('review.trainer_id = :TrainerId', { TrainerId })
            .getRawOne();

        return reviews;
    }

    async checkIfReviewExists(customerId: number, lessonId: number): Promise<boolean> {
        const existingReview = await this.ReviewsRepository.createQueryBuilder('review')
            .where('review.customer_id = :customerId', { customerId })
            .andWhere('review.lesson_id = :lessonId', { lessonId })
            .getOne();
        return !!existingReview;
    }

    async getAllReviewBasedLessonId(lessonId: number, getReviewRequestDto: GetReviewRequestDto): Promise<any> {
        const { limit, offset } = getReviewRequestDto;
        const query = await this.ReviewsRepository.find({
            relations: { user: true },
            where: { lesson_id: lessonId },
            take: limit,
            skip: offset,
            select: {
                id: true,
                rate: true,
                customer_id: true,
                description: true,
            },
        });

        return query;
    }

    async getReviewBasedTrainerId(TrainerId: number, baseGetRequest?: BaseGetRequest): Promise<any> {
        if (!baseGetRequest) {
            baseGetRequest = { limit: 3, offset: 0 };
        }
        const { limit, offset } = baseGetRequest;
        const reviews = await this.ReviewsRepository.find({
            relations: { user: true },
            where: { trainer_id: TrainerId },
            take: limit,
            skip: offset,
            select: {
                id: true,
                description: true,
                createdAt: true,
            },
        });
        return reviews;
    }
}
