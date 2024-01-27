import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailLoginRequestDto } from '../dtos/requests/email-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EmailAuthService extends AuthService {
    constructor(protected readonly jwtService: JwtService) {
        super(jwtService);
    }

    // async register(ipAddress: string, registerDto: EmailRegisterDto): Promise<User> {
    //     // Check if phoneNumber and email registered before
    //     const user = await this.checkIfUserExists(registerDto.email);

    //     // Construct user Model
    //     const newUserModel: UserModel = await this.constructUserModel(registerDto);

    //     // Save User
    //     if (!user) {
    //         return await this.userService.saveUser(newUserModel);
    //     }

    //     // Return user registered response
    //     return;
    // }

    // async login(loginRequest: EmailLoginRequestDto) {
    //     const userType = loginRequest.type;
    //     if (userType == 'user') {
    //         const user = await this.userService.getUserByEmail(loginRequest.email);

    //         // Validate if user can login
    //         await this.validateUserLogin(user, loginRequest);
    //         // Return user registered response
    //         return this.constructVerifiedUserResponse(user);
    //     }
    //     if (userType == 'trainer') {
    //         const trainer = await this.trainerService.getTrainerByEmail(loginRequest.email);
    //         // Validate if user can login
    //         await this.validateUserLogin(trainer, loginRequest);
    //         // Return user registered response
    //         return this.constructVerifiedUserResponse(trainer);
    //     }
    // }
    // async userLogin(loginRequest: EmailLoginRequestDto) {
    //     // Get user by email to check if user exists or not
    //     const user = await this.userService.getUserByEmail(loginRequest.email);

    //     // Validate if user can login
    //     await this.validateUserLogin(user, loginRequest);

    //     // Check user type and take appropriate actions
    //     if (user.type === 'customer') {
    //         return this.constructVerifiedUserResponse(user);
    //     } else if (user.type === 'admin') {
    //         return this.constructVerifiedUserResponseForAdmin(user);
    //     } else if (user.type === 'trainer') {
    //         return this.constructVerifiedUserResponseForTrainer(user);
    //     } else {
    //          throw new UnprocessableEntityException(error);
    //     }
    // }

    async validateUserLogin(user, loginRequest: EmailLoginRequestDto) {
        // Compare login password with the hashed password in the database
        const isPasswordMatching = await bcrypt.compare(loginRequest.password, user.password);

        // validate user password
        if (!isPasswordMatching) {
            const errors = [
                {
                    password: `Password is not correct!`,
                },
            ];
            throw new UnprocessableEntityException(errors);
        }
    }
}
