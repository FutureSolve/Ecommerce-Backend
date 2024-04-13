import { UserRepository } from 'src/app/user/repositories/user.repository';
import { User } from './../entities/user.entity';
import { PaginationResponseDto } from './../../shared/dtos/responses/pagination-response.dto';
import { getUserRequestDto } from '../dto/requests/get-users-request.dto';
import { GetUsersResponseDto } from '../dto/responses/get-users-response.dto';
import { UserResponseDto } from '../dto/responses/user-response.dto';
import {
    BadRequestException,
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
import { FindOptionsWhere } from 'typeorm';
@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private config: ConfigService,
        protected readonly jwtService: JwtService,
    ) {}

    async register(user: CreateUsersRequestDto) {
        const existingUser = await this.findUser({ email: user.email });
        if (existingUser) throw new BadRequestException('User already exists!');
        const newUser = await this.saveUser(user);
        return this.constructVerifiedUserResponse(newUser);
    }

    async saveUser(userDetails: CreateUsersRequestDto): Promise<User> {
        try {
            const newUserModel: UserModel = await this.constructUserModel(userDetails);
            return await this.userRepository.save(newUserModel);
        } catch (error) {
            Logger.error(`Error while saving userModel: ${JSON.stringify(userDetails)}`, error);
            throw new InternalServerErrorException('Error while saving user data');
        }
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
        const userID = this.findUser({ id });
        await this.userRepository.update({ id: (await userID).id }, { isVerified: true });
    }

    async updateUser(id: number, userDetails: UpdateUserRequestDto) {
        const userID = this.findUser({ id });
        return await this.userRepository.update((await userID).id, userDetails);
    }
    async updateUserForGoogle(id: number, userDetails: any) {
        const userID = this.findUser({ id });
        return await this.userRepository.update((await userID).id, userDetails);
    }
    async findUser(options: FindOptionsWhere<User>): Promise<User> {
        return await this.userRepository.findOne({ where: options });
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

    async login(loginRequest: EmailLoginRequestDto) {
        const user = await this.userRepository.findOne({ where: { email: loginRequest.email } });

        // Validate if user can login
        await this.validateUserLogin(user, loginRequest);
        // Return user registered response
        return this.constructVerifiedUserResponse(user);
    }
    async validateUserLogin(user: User, loginRequest: EmailLoginRequestDto) {
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
            phone: registerRequest.phone,
            city: registerRequest.city,
            address: registerRequest.address,
        });
    }

    generateAccessToken(email: string, userType: UserTypeEnum, userId: number): string {
        try {
            const jwtPayload = {
                email: email,
                id: userId,
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
                id: userId,
            };
            return this.jwtService.sign(jwtPayload, { expiresIn: '365d' });
        } catch (error) {
            Logger.error(`Error while generating refresh token for user ${email}`);
            throw new InternalServerErrorException(`Something went wrong!`);
        }
    }

    constructVerifiedUserResponse(user: User): AuthResponseDto {
        const token = this.generateAccessToken(user.email, user.type, user.id);
        const refreshToken = this.generateRefreshToken(user.email, user.type, user.id);

        return new AuthResponseDto({
            userId: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isVerified: user.isVerified,
            token: token,
        });
    }

    async markDelete(userEmail: string) {
        await this.userRepository.softDelete({ email: userEmail });
        return;
    }
}
