import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public-decorator';
import { LocalAuthGuard } from './guards/local-auth-guards';
import { RolesGuard } from './guards/roles-guard';
import { authRequest } from './models/auth-request';

@Controller()
export class AuthController {
    constructor( private readonly authservice: AuthService){}


    @IsPublic()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard, RolesGuard)
    login(@Request() req: authRequest){
        console.log(req.user)
        return this.authservice.login(req.user)
    }
}

