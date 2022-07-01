import { Injectable } from "@nestjs/common";
import { encodePassWord } from "src/utils/bcrypt";
import { UpdateFuncionarioDto } from "./dto/update.funcionario.dto";
import { FuncionarioRepository } from "./funcionarios.repository";
import { Funcionario, FuncionarioModel } from "./schemas/funcionario.schema";

@Injectable()
export class FuncionarioService{
    constructor(private readonly funcionarioRepository: FuncionarioRepository){}

    async getUserbyEmail(email: string): Promise<Funcionario>{
        
        return this.funcionarioRepository.findOne({email})
    }
    async getUsers(): Promise<Funcionario[]>{
        return this.funcionarioRepository.find({});
    }

    async createUser(nome: string, email: string, senha: string): Promise<FuncionarioModel>{
        return this.funcionarioRepository.create({
            nome,
            email,
            senha: await encodePassWord(senha)
        })
    }
    async updateUser(email: string, funcionarioUpdate: UpdateFuncionarioDto): Promise<FuncionarioModel>{
        return this.funcionarioRepository.findOneAndUpdate({email}, funcionarioUpdate);
    }
    async deleteUser(email: string){
        return this.funcionarioRepository.deleteOne({email})
    }
}