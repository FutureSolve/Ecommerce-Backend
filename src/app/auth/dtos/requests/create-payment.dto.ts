import { IsArray, IsNumber } from 'class-validator';

export class CreatePaymentDto {
    @IsArray()
    @IsNumber({}, { each: true })
    lessonIds: number[];

    @IsNumber()
    userId: number;
}
