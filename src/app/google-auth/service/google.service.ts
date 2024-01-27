// import { Injectable } from '@nestjs/common';
// import { UserService } from 'src/app/user/services/user.service';
// import { JwtService } from '@nestjs/jwt';

// import { EmailAuthService } from 'src/app/auth/services/email-auth.service';
// import { UserModelForGoogle } from 'src/app/user/models/user.model';
// @Injectable()
// export class googleService {
//     constructor(private userService: UserService, private jwtService: JwtService, private emailAuthService: EmailAuthService) {}
//     async googleLogin(req) {
//         if (!req.user) {
//             return 'No user from Google';
//         }
//         const existingUser = await this.userService.getUserByEmailForGoogle(req.user.email);

//         if (existingUser) {
//             const constructVerifiedUserResponse = this.emailAuthService.constructVerifiedUserResponse(existingUser);
//             // User already exists, update their access token and refresh token
//             existingUser.accessToken = req.user.accessToken;
//             existingUser.refreshToken = req.user.refreshToken;

//             const updateExistingUser = {
//                 accessToken: existingUser.accessToken,
//                 refreshToken: existingUser.refreshToken,
//             };
//             // If needed, you can merge additional information here

//             await this.userService.updateUserForGoogle(existingUser.id, updateExistingUser);
//             return {
//                 message: 'User information from Google',
//                 googleToken: {
//                     googleAccessToken: existingUser.accessToken,
//                     googleRefreshToken: existingUser.refreshToken,
//                 },
//                 constructVerifiedUserResponse,
//             };
//         }

//         // Create a user model from Google data
//         const user: UserModelForGoogle = {
//             email: req.user.email,
//             name: `${req.user.firstName} ${req.user.lastName}`,
//             isVerified: false,
//             type: 'customer',
//             accessToken: req.user.accessToken,
//             refreshToken: req.user.refreshToken,
//         };

//         // Check if the user exists or register them
//         await this.userService.saveUserFromGoogle(user);
//         const constructVerifiedUserResponse = this.emailAuthService.constructVerifiedUserResponse(user);
//         return {
//             message: 'User information from Google',
//             googleToken: {
//                 googleAccessToken: req.user.accessToken,
//                 googleRefreshToken: req.user.refreshToken,
//             },
//             user: req.user,
//             constructVerifiedUserResponse,
//         };
//     }
// }
