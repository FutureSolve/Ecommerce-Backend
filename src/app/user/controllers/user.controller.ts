
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
import { EmailRegisterDto } from 'src/app/auth/dtos/requests/email-register.dto';
import { PaymentDto } from 'src/app/auth/dtos/requests/payment.dto';
import { RegisterBundleDto } from '../dto/requests/register-bundle.dto';
import { RegisterFullCourseDto } from '../dto/requests/register-full-course.dto';
import { ChangePasswordRequestDto, ForgetPasswordRequestDto } from '../dto/requests/forget-password-request.dto';

@Controller('api/v1/users')
@ApiTags('Users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    // @Post()
    // @ApiOperation({ summary: 'Create New User.' })
    // async createUser( @Body() userData: CreateUsersRequestDto) {
    //     return await this.userService.saveUser(userData);
    // }

   

    // @Post('pay')
    // @ApiOperation({ summary: 'pay if user register' })
    // @ApiResponse({
    //     status: 201,
    //     description: 'pay',
    // })
    // async pay(@Body() paymentDto: PaymentDto) {
    //     const user = await this.userService.getUserById(paymentDto.id);

    //     const paymentData = await this.paymentService.createPayment(user, paymentDto.lessonIds, paymentDto.language);

    //     return paymentData.redirectUrl;
    // }

    @Post('register')
    @ApiOperation({ summary: 'register' })
    @ApiResponse({
        status: 201,
        description: 'Register',
    })
    async userRegister( @Body() userRegisterDto: CreateUsersRequestDto) {
        return await this.userService.userRegister(userRegisterDto);
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

    @Post('forgetPassword')
    @ApiOperation({ summary: 'Forget password by email' })
    @ApiResponse({
        description: 'Forget password',
    })
    async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordRequestDto) {
        return await this.userService.forgetPassword(forgetPasswordDto);
    }

    @Post('changePassword')
    @ApiOperation({ summary: 'change password' })
    @ApiResponse({
        description: 'change password',
    })
    async changePassword(@Body() ChangePasswordDto: ChangePasswordRequestDto) {
        return await this.userService.changePassword(ChangePasswordDto);
    }



    @Delete('/delete')
    @ApiOperation({ summary: 'Delete User' })
    async deleteUser(@Body() userDetails: ForgetPasswordRequestDto) {
        await this.userService.markDelete(userDetails.email);
        return 'User Was Deleted Successfully';
    }

    // @Post('forgetPassword')
    // @ApiOperation({ summary: 'Forget password by email' })
    // @ApiResponse({
    //     description: 'Forget password',
    // })
    // async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordRequestDto) {
    //     const token = Math.random().toString(20).substring(2, 12); //generate random token

    //     return await this.userService.forgetPassword(forgetPasswordDto.email);
    // }
}
