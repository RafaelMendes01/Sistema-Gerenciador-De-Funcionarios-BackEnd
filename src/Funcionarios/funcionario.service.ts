import { Injectable } from "@nestjs/common";
import { UpdateFuncionarioDto } from "./dto/update.funcionario.dto";
import { FuncionarioRepository } from "./funcionarios.repository";
import { Funcionario, FuncionarioModel } from "./schemas/funcionario.schema";

@Injectable()
export class FuncionarioService{
    constructor(private readonly funcionarioRepository: FuncionarioRepository){}

    async getUserbyId(id: string): Promise<Funcionario>{
        
        return this.funcionarioRepository.findOne({_id: id})
    }
    async getUsers(): Promise<Funcionario[]>{
        return this.funcionarioRepository.find({});
    }

    async createUser(nome: String, email: String, senha: String): Promise<FuncionarioModel>{
        return this.funcionarioRepository.create({
            nome,
            email,
            senha
        })
    }
    async updateUser(id: String, funcionarioUpdate: UpdateFuncionarioDto): Promise<FuncionarioModel>{
        return this.funcionarioRepository.findOneAndUpdate({id}, funcionarioUpdate);
    }
    async deleteUser(id: String){
        return this.funcionarioRepository.deleteOne({_id: id})
    }
}