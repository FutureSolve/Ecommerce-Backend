import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderService } from '../services/order.service';
import { UpdateOrderRequestDto } from '../dtos/update-order-req.dto';
import { UserService } from 'App/user/services/user.service';
import { UserAuthGuard } from 'App/shared/guards/user-auth.guard';
import { CreateOrderDTO } from '../dtos/create-order.dto';
import { User } from 'App/user/entities/user.entity';

@Controller('api/v1/order')
@ApiTags('order')
export class OrderController {
    constructor(private orderService: OrderService, private userService: UserService) {}
    @Get('getAll')
    @ApiOperation({ summary: 'getAll-order' })
    async getAll() {
        return await this.orderService.getOrders();
    }

    @Post('create')
    @ApiBearerAuth()
    @UseGuards(UserAuthGuard)
    @ApiOperation({ summary: 'create-order' })
    async create(@Req() req, @Body() productCreate: CreateOrderDTO) {
        const userId = req.user.userId;
        const user = await this.userService.findUser({ id: userId });
        return await this.orderService.createOrder(user, productCreate);
    }

    @Post('update/:id')
    @ApiOperation({ summary: 'update-order' })
    async update(@Param('id') productID: number, @Body() productCreate: UpdateOrderRequestDto) {
        return await this.orderService.updateOrder(productID, productCreate);
    }

    @Delete('/delete/:id')
    @ApiOperation({ summary: 'Delete order' })
    async deleteUser(@Param('id') productID: number) {
        await this.orderService.markDelete(productID);
        return 'Offer Was Deleted Successfully';
    }
}
