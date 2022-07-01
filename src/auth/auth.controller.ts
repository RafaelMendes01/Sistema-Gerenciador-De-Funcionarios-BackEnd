import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth-guards';
import { authRequest } from './models/auth-request';

@Controller()
export class AuthController {
    constructor( private readonly authservice: AuthService){}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(@Request() req: authRequest){
        console.log(req.user)
        return this.authservice.login(req.user)
    }
}

