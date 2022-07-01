import { Injectable } from "@nestjs/common";
import { encodePassWord } from "src/utils/bcrypt";
import { UpdateFuncionarioDto } from "./dto/update.funcionario.dto";
import { FuncionarioRepository } from "./funcionarios.repository";
import { Funcionario, FuncionarioModel } from "./schemas/funcionario.schema";

@Injectable()
export class FuncionarioService{
    constructor(private readonly funcionarioRepository: FuncionarioRepository){}

    async getUserbyEmail(email: String): Promise<Funcionario>{
        
        return this.funcionarioRepository.findOne({email})
    }
    async getUsers(): Promise<Funcionario[]>{
        return this.funcionarioRepository.find({});
    }

    async createUser(nome: String, email: String, senha: String): Promise<FuncionarioModel>{
        return this.funcionarioRepository.create({
            nome,
            email,
            senha: await encodePassWord(senha)
        })
    }
    async updateUser(email: String, funcionarioUpdate: UpdateFuncionarioDto): Promise<FuncionarioModel>{
        return this.funcionarioRepository.findOneAndUpdate({email}, funcionarioUpdate);
    }
    async deleteUser(email: String){
        return this.funcionarioRepository.deleteOne({email})
    }
}