// import { GoogleOAuthGuard } from '../google-oauth.guard';
// import { Controller, Get, Request, UseGuards } from '@nestjs/common';
// import { googleService } from '../service/google.service';
// import { ApiOperation, ApiTags } from '@nestjs/swagger';

// @Controller('auth')
// export class googleController {
//     constructor(private readonly googleService: googleService) {}

//     @Get()
//     @UseGuards(GoogleOAuthGuard)
//     @ApiTags('Google')
//     @ApiOperation({ summary: 'google Register' })
//     async googleAuth(@Request() req) {}

//     @Get('google-redirect')
//     @UseGuards(GoogleOAuthGuard)
//     @ApiTags('Google')
//     @ApiOperation({ summary: 'google redirect' })
//     googleAuthRedirect(@Request() req) {
//         return this.googleService.googleLogin(req);
//     }
// }
