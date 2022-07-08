import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

import { Observable } from "rxjs";
import { authRequest } from "../models/auth-request";
import { JwtPayload } from "../models/jwtpayload";


@Injectable()
export class RolesGuard implements CanActivate{
    canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
        const request: authRequest = context.switchToHttp().getRequest()
        const jwtToken = request.headers.authorization
    
        const decode = jwtToken.split('.')[1]
        const decodeBuffer = Buffer.from(decode, 'base64')
        const role = JSON.parse(decodeBuffer.toString()) as JwtPayload
        console.log(role)
     
        if(role.user.role === 'admin') {
          return true; 
    
        } else {
          throw new UnauthorizedException('Esta requisição só poderá ser feita por um usuário administrativo');
         }
      } 
    }