import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { FuncionarioService } from 'src/Funcionarios/funcionario.service';
import {  FuncionarioModel } from 'src/Funcionarios/schemas/funcionario.schema';
@Injectable()
export class AuthService {
  funcionarioModel: FuncionarioModel;
  constructor(
    private readonly FuncionarioService: FuncionarioService,
  ) {}

  async validateUser(email: string, password: string){
    const user = await this.FuncionarioService.getUserbyEmail(email);
    console.log(user)

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, this.funcionarioModel.senha.toString());

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
