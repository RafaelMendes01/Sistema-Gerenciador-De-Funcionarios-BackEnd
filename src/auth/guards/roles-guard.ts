import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

import { Observable } from "rxjs";
import { authRequest } from "../models/auth-request";
import { JwtPayload } from "../models/jwtpayload";
import { IS_PUBLIC_KEY } from '../decorators/is-public-decorator';
import { Reflector } from "@nestjs/core";


@Injectable()
export class RolesGuard implements CanActivate{
  constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

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