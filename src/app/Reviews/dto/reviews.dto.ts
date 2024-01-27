import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { BaseGetRequest } from 'src/app/shared/dtos/requests/base-get-request.dto';

export class reviewsRequestDto {
    @IsOptional()
    // @ApiProperty({ example: 1 })
    id: number;

    @IsString()
    @IsOptional()
    @Length(0, 150, { message: 'Description should not exceed 150 characters' })
    @ApiProperty({ example: 'I really benefited from this lesson' })
    description: string;

    @ApiProperty({ example: 1, description: 'A rating from 1 to 5.' })
    @IsNotEmpty()
    rate: number;

    @ApiProperty({ example: 4, description: 'The unique identifier of the customer who provided the rating.' })
    @IsNotEmpty()
    customer_id: number;

    @ApiProperty({ example: 4, description: 'The unique identifier of the trainer who is being rated.', nullable: true })
    @IsNotEmpty()
    trainer_id: number;

    @ApiProperty({ example: 4, description: 'The unique identifier of the lesson or course for which the rating is provided.' })
    @IsNotEmpty()
    lesson_id: number;
}

export class updateReviewsRequestDto {
    @IsString()
    @IsOptional()
    @Length(0, 150, { message: 'Description should not exceed 150 characters' })
    @ApiProperty({ example: 'I really benefited from this lesson' })
    description: string;

    @ApiProperty({ example: 1, description: 'A rating from 1 to 5.' })
    @IsNotEmpty()
    rate: number;
}
