import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReviewsService } from '../services/reviews.service';
import { reviewsRequestDto, updateReviewsRequestDto } from '../dto/reviews.dto';
import { Reviews } from '../entities/reviews.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetReviewRequestDto } from '../dto/get-review-request.dto';

@ApiTags('Reviews')
@Controller('api/v1/reviews')
export class ReviewsController {
    constructor(private ReviewsService: ReviewsService) {}

    @Post()
    @ApiOperation({ summary: 'create review' })
    @UsePipes(new ValidationPipe())
    createReviews(@Body() dto: reviewsRequestDto): Promise<Reviews> {
        return this.ReviewsService.createReview(dto);
    }

    @Get('getAllAverageReviewBasedLessonId/:id')
    @ApiOperation({ summary: 'Get All Review Based Lesson id ' })
    getAllAverageReviewBasedLessonId(@Param('id', ParseIntPipe) lessonId: number): Promise<any> {
        return this.ReviewsService.getAllAverageReviewBasedLessonId(lessonId);
    }

    @Get('getAllReviewBasedLesson/:id')
    @ApiOperation({ summary: 'Get All Review Based Lesson id ' })
    async getAllReviewBasedLesson(
        @Param('id', ParseIntPipe) lessonId: number,
        @Query() getReviewRequestDto: GetReviewRequestDto,
    ): Promise<any> {
        return await this.ReviewsService.getAllReviewBasedLessonId(lessonId, getReviewRequestDto);
    }

    // based on user id
    @Get('getAllReviewBasedUser/:id')
    @ApiOperation({ summary: 'Get All Review Based User id ' })
    async getAllReviewBasedUserId(@Param('id', ParseIntPipe) userId: number): Promise<any> {
        return await this.ReviewsService.getAllReviewBasedUserId(userId);
    }

    // @Get('getAllReviewBasedTrainer/:id')
    // @ApiOperation({ summary: 'Get All Review Based Trainer id ' })
    // getAllReviewBasedTrainerId(@Param('id', ParseIntPipe) TrainerId: number): Promise<any> {
    //     return this.ReviewsService.getAllReviewBasedTrainerId(TrainerId);
    // }

    // @Get('/:review_id')
    // @ApiOperation({ summary: 'Get one Review Based review id ' })
    // getReviewByReviewId(@Param('review_id', ParseIntPipe) review_id: number): Promise<any> {
    //     return this.ReviewsService.getReviewByReviewId(review_id);
    // }

    @Put('/:review_id')
    @ApiOperation({ summary: 'update one Review Based review id  ' })
    updateReview(@Param('review_id', ParseIntPipe) review_id: number, @Body() dto: updateReviewsRequestDto): Promise<any> {
        return this.ReviewsService.updateReview(review_id, dto);
    }

    @Delete('/:review_id')
    @ApiOperation({ summary: 'delete one Review Based review id  ' })
    delete(@Param('review_id', ParseIntPipe) review_id: number): Promise<void> {
        return this.ReviewsService.deleteReview(review_id);
    }
}
