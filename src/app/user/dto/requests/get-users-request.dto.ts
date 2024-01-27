import { BaseGetRequest } from '../../../shared/dtos/requests/base-get-request.dto';
import { IsEnum, IsIn, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';
import { UsersSortParametersEnum } from '../../enums/users-sort-param.enum';
import { ApiProperty } from '@nestjs/swagger';

export class getUserRequestDto extends BaseGetRequest {
    @IsEnum(UsersSortParametersEnum)
    @IsNotEmpty()
    @ValidateIf((obj) => obj.order != null)
    @ApiProperty({ enum: UsersSortParametersEnum, example: UsersSortParametersEnum.ID, required: false })
    orderBy: UsersSortParametersEnum;

    @IsIn(['ASC', 'DESC'])
    @IsNotEmpty()
    @ValidateIf((obj) => obj.orderBy != null)
    @ApiProperty({ enum: ['ASC', 'DESC'], example: 'ASC', required: false })
    order: OrderType;

    @IsOptional()
    @ApiProperty({ example: '', required: false })
    email: string;

    @IsOptional()
    @ApiProperty({ example: 10, required: false })
    limit: number;

    @IsOptional()
    @ApiProperty({ example: 0, required: false })
    offset: number;
}

type OrderType = 'ASC' | 'DESC';
