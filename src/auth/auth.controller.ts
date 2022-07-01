import { Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth-guards';

@Controller()
export class AuthController {
    constructor( private readonly authservice: AuthService){}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(){
        return 'teste';
    }
}

