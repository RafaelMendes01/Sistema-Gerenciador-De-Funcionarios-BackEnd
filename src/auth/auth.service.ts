import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { FuncionarioService } from 'src/Funcionarios/funcionario.service';
import { Funcionario } from 'src/Funcionarios/schemas/funcionario.schema';
import { UserPayload } from './models/user-payload';
import { UserToken } from './models/user-token';
@Injectable()
export class AuthService {
  constructor(
    private readonly FuncionarioService: FuncionarioService,
    private readonly jwtService: JwtService
  ) {}
  login(user: Funcionario): UserToken {
    const payload:UserPayload = {
      email: user.email,
      name: user.nome

    };
    const jwtToken = this.jwtService.sign(payload);

    return{
      access_token: jwtToken,
    }
}

  async validateUser(email: string, password: string){
    const user = await this.FuncionarioService.getUserbyEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.senha);

      if (isPasswordValid) {
        return {
          ...user
        };
      }
    }

    throw new Error(
      'email ou senha incorretas.',
    );
  }
}
