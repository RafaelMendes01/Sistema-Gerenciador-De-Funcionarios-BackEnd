import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { FuncionarioService } from 'src/Funcionarios/funcionario.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly FuncionarioService: FuncionarioService,
  ) {}

  async validateUser(email: string, password: string){
    const user = await this.FuncionarioService.getUserbyEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.senha);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new Error(
      'Email address or password provided is incorrect.',
    );
  }
}
