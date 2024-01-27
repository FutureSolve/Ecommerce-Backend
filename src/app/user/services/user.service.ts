import { UserRepository } from 'src/app/user/repositories/user.repository';
import { User } from './../entities/user.entity';
import { PaginationResponseDto } from './../../shared/dtos/responses/pagination-response.dto';
import { getUserRequestDto } from '../dto/requests/get-users-request.dto';
import { GetUsersResponseDto } from '../dto/responses/get-users-response.dto';
import { UserResponseDto } from '../dto/responses/user-response.dto';
import {
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { UpdateUserRequestDto } from '../dto/requests/update-user-request.dto';
import { CreateUsersRequestDto } from '../dto/requests/create-user-request.dto';
import { UserModel } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import { EmailLoginRequestDto } from 'src/app/auth/dtos/requests/email-login.dto';
import { EmailRegisterDto } from 'src/app/auth/dtos/requests/email-register.dto';
import { AuthResponseDto } from 'src/app/auth/dtos/responses/auth-response.dto';
import { UserTypeEnum } from '../enums/user-type.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
const jwt = require('jsonwebtoken');
import { ChangePasswordRequestDto } from '../dto/requests/forget-password-request.dto';
@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private config: ConfigService,
        protected readonly jwtService: JwtService,
    ) {}
    async constructUserRegisterModel(registerRequest: CreateUsersRequestDto): Promise<UserModel> {
        return new UserModel({
            name: registerRequest.name,
            email: registerRequest.email,
            password: await bcrypt.hash(registerRequest.password, 10),
            type: UserTypeEnum.CUSTOMER,
        });
    }

    async saveUser(userDetails): Promise<User> {
        try {
            // Search for the user
            // const user = await this.userRepository.findOneBy({email:userDetails.email});

            //const userLocation = await this.ipGeolocationCommunicator.getLocation(ipAddress);
            //const location = await this.ipGeolocationCommunicator.saveLocationData(userLocation);
            //userDetails.locationId = location.id;
            const newUserModel: UserModel = await this.constructUserModel(userDetails);
            return await this.userRepository.save(newUserModel);
        } catch (error) {
            Logger.error(`Error while saving userModel: ${JSON.stringify(userDetails)}`, error);
            throw new InternalServerErrorException('Error while saving user data');
        }
    }
    async saveUserFromGoogle(userDetails: any): Promise<User> {
        try {
            // Save User in Database
            return await this.userRepository.save(userDetails);
        } catch (error) {
            Logger.error(`Error while saving userModel: ${JSON.stringify(userDetails)}`, error);
            throw new InternalServerErrorException('Error while saving user data');
        }
    }

    getUserById(id: number): Promise<User> {
        return this.findUser(id);
    }

    async getUserByEmail(userEmail: string) {
        const user = await this.userRepository.findOne({ where: { email: userEmail } });

        if (!user) {
            throw new HttpException('User Is Not Found', HttpStatus.BAD_REQUEST);
        }
        return user;
    }
    async getUserByEmailForGoogle(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } });
        return user;
    }

    async getUserByEmailAndPhoneNumber(email: string): Promise<User> {
        return await this.userRepository.findOne({
            where: [{ email }],
        });
    }

    async getVerifiedUserByEmailOrPhoneNumber(email: string): Promise<User> {
        return await this.userRepository.findOne({
            where: [{ email, isVerified: true }],
        });
    }

    async getAllUsers(getUserRequest: getUserRequestDto): Promise<GetUsersResponseDto> {
        // Get All Users
        let offset = 0;
        if (getUserRequest.offset > 0) {
            offset = getUserRequest.offset * getUserRequest.limit;
        }
        const usersWithCount = await this.userRepository.getFilteredUsers({
            ...getUserRequest,
            offset,
        });

        // return Mapped Response
        const usersList = usersWithCount[0].map(
            (user: User) => new UserResponseDto(user.id, user.name, user.email, user.isVerified, user.orders),
        );

        let pagination: PaginationResponseDto = undefined;
        if (getUserRequest.limit) {
            pagination = new PaginationResponseDto(usersWithCount[1], getUserRequest.limit, getUserRequest.offset);
        }

        return new GetUsersResponseDto({
            list: usersList,
            pagination: pagination,
        });
    }

    async markUserAsVerified(id: number) {
        const userID = this.findUser(id);
        await this.userRepository.update({ id: (await userID).id }, { isVerified: true });
    }

    async updateUser(id: number, userDetails: UpdateUserRequestDto) {
        const userID = this.findUser(id);
        return await this.userRepository.update((await userID).id, userDetails);
    }
    async updateUserForGoogle(id: number, userDetails: any) {
        const userID = this.findUser(id);
        return await this.userRepository.update((await userID).id, userDetails);
    }
    private async findUser(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new HttpException('User Is Not Found', HttpStatus.BAD_REQUEST);
        }
        return user;
    }

    async forgetPassword(forgetPasswordDto) {
        const user = await this.getUserByEmail(forgetPasswordDto.email);
        const token = jwt.sign({ email: user.email }, this.config.get('app.authSecret'), { expiresIn: '1d' });
        if (user) {
            const updatingUser = {
                name: user.name,
                email: user.email,
                password: user.password,
                directLink: forgetPasswordDto.directLink,
                token: token,
            };
        } else {
            throw new HttpException('Wrong Email', HttpStatus.BAD_REQUEST);
        }
    }
    async getUserWithOrders(userId: number): Promise<User | undefined> {
        try {
            const user = await this.userRepository.findOne({
                where: { id: userId },
                relations: ['orders'],
            });

            if (!user) {
                throw new NotFoundException(`User with ID ${userId} not found`);
            }

            return user;
        } catch (error) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
    }
    async changePassword(ChangePasswordDto: ChangePasswordRequestDto) {
        const token = ChangePasswordDto.token;
        let message = '';
        try {
            const decodedToken = jwt.verify(token, this.config.get('app.authSecret'));
            if (decodedToken && decodedToken.email) {
                const user = await this.getUserByEmail(decodedToken.email);
                if (user) {
                    user.password = await bcrypt.hash(ChangePasswordDto.password, 10);
                    await this.userRepository.save(user);
                    message = 'Password updated successfully';
                } else {
                    message = 'User not found';
                }
            } else {
                message = 'Invalid token';
            }
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                message = 'Token has expired';
            } else {
                message = 'Invalid token';
            }
        }
        return message;
    }

    async login(loginRequest: EmailLoginRequestDto) {
        const user = await this.getUserByEmail(loginRequest.email);

        // Validate if user can login
        await this.validateUserLogin(user, loginRequest);
        // Return user registered response
        return this.constructVerifiedUserResponse(user);
    }
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
    async constructUserModel(registerRequest: CreateUsersRequestDto): Promise<UserModel> {
        return new UserModel({
            name: registerRequest.name,
            email: registerRequest.email,
            password: await bcrypt.hash(registerRequest.password, 10),
            type: UserTypeEnum.CUSTOMER,
            phone:registerRequest.phone,
            city:registerRequest.city,
            address:registerRequest.address,
        });
        
    }
    async register(registerDto: any): Promise<User> {
        // Check if phoneNumber and email registered before
        const user = await this.checkIfUserExists(registerDto.email);

        // Save User
        if (!user) {
            return await this.saveUser(registerDto);
        }

        // Return user registered response
        return user;
    }
    async userRegister(userRegisterDto: CreateUsersRequestDto) {
        const user = await this.checkIfUserExists(userRegisterDto.email);
console.log(userRegisterDto)
        // Save User
        if (!user) {
            const createdUser = await this.saveUser(userRegisterDto);
            // Return user registered response
            return this.constructVerifiedUserResponse(createdUser);
        } else return 'user is register';
    }
    async checkIfUserExists(email: string): Promise<any> {
        // Check if either the email or phone number is used in another verified account
        const verifiedUser = await this.getVerifiedUserByEmailOrPhoneNumber(email);
        if (verifiedUser) {
            const errors = [];
            if (verifiedUser.email == email) {
                errors.push({
                    email: `Email ${email} already exists!`,
                });
            }

            throw new UnprocessableEntityException(errors);
        }

        // Get user by email and phone number (Combined Unique properties for user)
        const user = await this.getUserByEmailAndPhoneNumber(email);
        if (user && user.isVerified) {
            const errors = [
                {
                    email: `Email ${email} already exists!`,
                },
            ];
            throw new UnprocessableEntityException(errors);
        }

        return user;
    }

    async checkIfEmailExists(email: string) {
        const user = await this.getUserByEmail(email);
        if (user && user.isVerified) {
            const errors = [
                {
                    email: `Email ${email} is registered before!`,
                },
            ];
            throw new UnprocessableEntityException(errors);
        }
        return user;
    }
    generateAccessToken(email: string, userType: UserTypeEnum, userId: number): string {
        try {
            const jwtPayload = {
                email: email,
                userId: userId,
                userType: userType,
            };
            return this.jwtService.sign(jwtPayload, { expiresIn: '30d' });
        } catch (error) {
            Logger.error(`Error while generating access token for user ${email}`);
            throw new InternalServerErrorException(`Something went wrong!`);
        }
    }

    generateRefreshToken(email: string, userType: UserTypeEnum, userId: number): string {
        try {
            const jwtPayload = {
                email: email,
                userId: userId,
            };
            return this.jwtService.sign(jwtPayload, { expiresIn: '365d' });
        } catch (error) {
            Logger.error(`Error while generating refresh token for user ${email}`);
            throw new InternalServerErrorException(`Something went wrong!`);
        }
    }

    constructVerifiedUserResponse(user: any): AuthResponseDto {
        const token = this.generateAccessToken(user.email, user.type, user.id);
        const refreshToken = this.generateRefreshToken(user.email, user.type, user.id);

        return new AuthResponseDto({
            userId: user.id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            isVerified: user.isVerified,
            token: token,
        });
    }

    async markDelete(userEmail: string) {
        await this.userRepository.softDelete({ email: userEmail });
        return;
    }
    // async forgetPassword(userEmail: string) {
    //     const user = await this.getUserByEmail(userEmail);

    //     if (user) {
    //         const updatingUser: UpdateUserRequestDto = {
    //             name: user.name,
    //             email: user.email,
    //             password: user.password,
    //             phoneNumber: user.phoneNumber,
    //         };

    //         //send email to reset password
    //         this.forgetPasswordNotificationService.sendForgetPasswordEmail(updatingUser);
    //     } else {
    //         throw new HttpException('Wrong Email', HttpStatus.BAD_REQUEST);
    //     }
    // }

    // async updatePassword(confirmingPasswordDto: ConfirmingPasswordDto) {
    //     const user = await this.getUserByEmail(confirmingPasswordDto.email);
    //     user.password = confirmingPasswordDto.confirmedPassword;
    //     return await this.userRepository.save(user);
    // }
}
