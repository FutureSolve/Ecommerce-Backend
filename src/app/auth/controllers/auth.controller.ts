// import { QuizNotificationService } from './../../notification/services/quiz-notification.service';
// import { PaymentService } from './../../payment/services/payment.service';
// import { Body, Controller, Ip, Post, UseGuards } from '@nestjs/common';
// import { EmailRegisterDto } from '../dtos/requests/email-register.dto';
// import { EmailAuthService } from '../services/email-auth.service';
// import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
// import { CreatePaymentResponseDto } from '../../payment/dtos/responses/create-payment-response.dto';
// import { EmailLoginRequestDto } from '../dtos/requests/email-login.dto';
// import { AuthResponseDto } from '../dtos/responses/auth-response.dto';
// import { PaymentDto } from '../dtos/requests/payment.dto';
// import { UserService } from 'src/app/user/services/user.service';
// import { UserRegisterDto } from '../dtos/requests/user-register.dto';
// import { UserAuthGuard } from '../guards/user-auth.guard';
// import { CreateUsersRequestDto } from 'src/app/user/dto/requests/create-user-request.dto';

// @Controller('api/v1/auth')
// export class AuthController {
//     constructor(
//         private emailAuthService: EmailAuthService,
//         private paymentService: PaymentService,
//         private QuizNotificationService: QuizNotificationService,
//         private userService: UserService,
//     ) {}

//     @Post('register-and-pay')
//     @ApiTags('Auth')
//     @ApiOperation({ summary: 'Register and pay' })
//     @ApiResponse({
//         status: 201,
//         description: 'Register and pay',
//         type: CreatePaymentResponseDto,
//     })
//     async register(@Ip() ipAddress: string, @Body() emailRegisterDto: EmailRegisterDto) {
//         const { language } = emailRegisterDto;
//         const user = await this.emailAuthService.register(ipAddress, emailRegisterDto);
//         const paymentData: CreatePaymentResponseDto = await this.paymentService.createPayment(
//             user,
//             emailRegisterDto.lessonIds,
//             emailRegisterDto.language,
//         );
//         return paymentData;
//     }

//     @Post('pay')
//     @ApiTags('Auth')
//     @ApiOperation({ summary: 'pay if user register' })
//     @ApiResponse({
//         status: 201,
//         description: 'pay',
//     })
//     async pay(@Body() paymentDto: PaymentDto) {
//         const user = await this.userService.getUserById(paymentDto.id);

//         const paymentData = await this.paymentService.createPayment(user, paymentDto.lessonIds, paymentDto.language);

//         return paymentData.redirectUrl;
//     }

// @Post('register')
// @ApiTags('Auth')
// @ApiOperation({ summary: 'register without pay' })
// @ApiResponse({
//     status: 201,
//     description: 'Register',
// })
// async userRegister(@Ip() ipAddress: string, @Body() userRegisterDto: CreateUsersRequestDto) {
//     return await this.emailAuthService.userRegister(userRegisterDto);
// }

//     @Post('login')
//     @ApiTags('Auth')
//     @ApiOperation({ summary: 'Login' })
//     @ApiResponse({
//         status: 201,
//         description: 'Login endpoint',
//         type: EmailLoginRequestDto,
//     })
//     async login(@Body() loginRequest: EmailLoginRequestDto): Promise<AuthResponseDto> {
//         return await this.emailAuthService.login(loginRequest);
//     }
// }
