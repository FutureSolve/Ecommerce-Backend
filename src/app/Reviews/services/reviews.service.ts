import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { reviewsRequestDto, updateReviewsRequestDto } from '../dto/reviews.dto';
import { Reviews } from '../entities/reviews.entity';
import { ReviewsRepository } from '../repositories/reviews.repo';
import { GetReviewRequestDto } from '../dto/get-review-request.dto';

@Injectable()
export class ReviewsService {
    constructor(private readonly reviewsRepository: ReviewsRepository) {}

    async createReview(dto: reviewsRequestDto): Promise<Reviews> {
        const checkIfReviewExists = await this.reviewsRepository.checkIfReviewExists(dto.customer_id, dto.lesson_id);
        if (checkIfReviewExists) {
            throw new HttpException('A review already exists for this client and lesson.', HttpStatus.BAD_REQUEST);
        }
        const newReview = this.reviewsRepository.create(dto);
        await this.reviewsRepository.save(newReview);
        return newReview;
    }

    async getAllAverageReviewBasedLessonId(lessonId): Promise<any> {
        return await this.reviewsRepository.getAllAverageReviewBasedLessonId(lessonId);
    }

    async getAllReviewBasedLessonId(lessonId, getReviewRequestDto: GetReviewRequestDto): Promise<any> {
        return await this.reviewsRepository.getAllReviewBasedLessonId(lessonId, getReviewRequestDto);
    }

    async getAllAverageReviewBasedTrainerId(TrainerId): Promise<any> {
        return await this.reviewsRepository.getAllAverageReviewBasedTrainerId(TrainerId);
    }

    async getAllReviewBasedUserId(userId): Promise<any> {
        return await this.reviewsRepository.find({ where: { customer_id: userId } });
    }

    async updateReview(review_id: number, dto: updateReviewsRequestDto): Promise<any> {
        try {
            const existingReview = await this.reviewsRepository.findOne({ where: { id: review_id } });

            if (!existingReview) {
                return { status: 404, message: 'Review not found' };
            }

            Object.assign(existingReview, dto);

            const updatedReview = await this.reviewsRepository.save(existingReview);
            return { status: 200, Review: updatedReview };
        } catch (err) {
            return { status: 500, message: 'Error in updating Review' };
        }
    }

    async getReviewByReviewId(review_id): Promise<any> {
        const review = await this.reviewsRepository.findOne({ where: { id: review_id } });
        if (!review) {
            throw new NotFoundException(`review ${review_id} is not found!`);
        }
        return review;
    }

    async deleteReview(review_id: number): Promise<any> {
        const review = await this.reviewsRepository.findOne({ where: { id: review_id } });

        if (!review) {
            throw new NotFoundException(`Review with ID ${review_id} is not found!`);
        } else {
            await this.reviewsRepository.delete(review_id);
            return `Review with ID ${review_id} has been deleted successfully.`;
        }
    }
}
