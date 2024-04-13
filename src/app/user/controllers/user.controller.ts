import { Body, Controller, Delete, Get, Ip, Param, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { getUserRequestDto } from '../dto/requests/get-users-request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from '../dto/responses/user-response.dto';
import { GetUsersResponseDto } from '../dto/responses/get-users-response.dto';
import { CreateUsersRequestDto } from '../dto/requests/create-user-request.dto';
import { UpdateUserRequestDto } from '../dto/requests/update-user-request.dto';
import { EmailLoginRequestDto } from 'src/app/auth/dtos/requests/email-login.dto';
import { AuthResponseDto } from 'src/app/auth/dtos/responses/auth-response.dto';
import { ChangePasswordRequestDto, ForgetPasswordRequestDto } from '../dto/requests/forget-password-request.dto';

@Controller('api/v1/users')
@ApiTags('Users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    @ApiOperation({ summary: 'register' })
    @ApiResponse({
        status: 201,
        description: 'Register',
    })
    async userRegister(@Body() userRegisterDto: CreateUsersRequestDto) {
        return await this.userService.register(userRegisterDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login' })
    @ApiResponse({
        status: 201,
        description: 'Login endpoint',
        type: EmailLoginRequestDto,
    })
    async login(@Body() loginRequest: EmailLoginRequestDto): Promise<AuthResponseDto> {
        return await this.userService.login(loginRequest);
    }

    @Get()
    @ApiOperation({ summary: 'Get All Users' })
    @ApiResponse({
        description: 'Get All Users',
        type: GetUsersResponseDto,
    })
    async getUsers(@Query() getUserRequest: getUserRequestDto): Promise<GetUsersResponseDto> {
        return await this.userService.getAllUsers(getUserRequest);
    }

    @Get(':userId')
    @ApiOperation({ summary: 'Get User By ID' })
    @ApiResponse({
        description: 'Get User By ID',
        type: UserResponseDto,
    })
    async getUserById(@Param('userId', ParseIntPipe) userID: number) {
        return await this.userService.getUserWithOrders(userID);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update User' })
    async updateUser(@Param('id') userID: number, @Body() updateData: UpdateUserRequestDto) {
        return await this.userService.updateUser(userID, updateData);
    }

    @Delete('/delete')
    @ApiOperation({ summary: 'Delete User' })
    async deleteUser(@Body() userDetails: ForgetPasswordRequestDto) {
        await this.userService.markDelete(userDetails.email);
        return 'User Was Deleted Successfully';
    }
}
