import { IsString, IsOptional, IsEnum, ValidateIf, IsIn, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseGetRequest } from 'src/app/shared/dtos/requests/base-get-request.dto';
import { reviewSortParametersEnum } from '../enums/review-sort-parameters.enum';

export class GetReviewRequestDto extends BaseGetRequest {
    @IsEnum(reviewSortParametersEnum)
    @IsNotEmpty()
    @ApiProperty({ enum: reviewSortParametersEnum, example: reviewSortParametersEnum.review_id, required: false })
    lessonId: number;
}
