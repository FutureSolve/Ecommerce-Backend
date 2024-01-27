import { UserTypeEnum } from './../../user/enums/user-type.enum';

import { InternalServerErrorException, Logger } from '@nestjs/common';

import { AuthResponseDto } from '../dtos/responses/auth-response.dto';
import { JwtService } from '@nestjs/jwt';

export class AuthService {
    constructor(protected readonly jwtService: JwtService) {}

    // async checkIfUserExists(email: string): Promise<any> {
    //     // Check if either the email or phone number is used in another verified account
    //     const verifiedUser = await this.userService.getVerifiedUserByEmailOrPhoneNumber(email);
    //     if (verifiedUser) {
    //         const errors = [];
    //         if (verifiedUser.email == email) {
    //             errors.push({
    //                 email: `Email ${email} already exists!`,
    //             });
    //         }

    //         throw new UnprocessableEntityException(errors);
    //     }

    //     // Get user by email and phone number (Combined Unique properties for user)
    //     const user = await this.userService.getUserByEmailAndPhoneNumber(email);
    //     if (user && user.isVerified) {
    //         const errors = [
    //             {
    //                 email: `Email ${email} already exists!`,
    //             },
    //         ];
    //         throw new UnprocessableEntityException(errors);
    //     }

    //     return user;
    // }

    // async checkIfEmailExists(email: string) {
    //     const user = await this.userService.getUserByEmail(email);
    //     if (user && user.isVerified) {
    //         const errors = [
    //             {
    //                 email: `Email ${email} is registered before!`,
    //             },
    //         ];
    //         throw new UnprocessableEntityException(errors);
    //     }
    //     return user;
    // }

    // async checkIfTrainerExists(email: string): Promise<any> {
    //     // Check if either the email or phone number is used in another verified account
    //     const verifiedTrainer = await this.trainerService.getVerifiedTrainerByEmail(email);
    //     if (verifiedTrainer) {
    //         const errors = [];
    //         if (verifiedTrainer.email == email) {
    //             errors.push({
    //                 email: `Email ${email} already exists!`,
    //             });
    //         }

    //         throw new UnprocessableEntityException(errors);
    //     }

    //     // Get user by email and phone number (Combined Unique properties for user)
    //     const user = await this.userService.getUserByEmailAndPhoneNumber(email);
    //     if (user && user.isVerified) {
    //         const errors = [
    //             {
    //                 email: `Email ${email} already exists!`,
    //             },
    //         ];
    //         throw new UnprocessableEntityException(errors);
    //     }

    //     return user;
    // }

    generateAccessToken(email: string, userType: UserTypeEnum, userId: number): string {
        try {
            const jwtPayload = {
                email: email,
                userType: userType,
                userId: userId,
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
                userType: userType,
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
            user_info: user.user_info,
            token: token,
        });
    }
}
