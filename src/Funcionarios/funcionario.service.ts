import { Injectable } from "@nestjs/common";
import { UpdateFuncionarioDto } from "./dto/update.funcionario.dto";
import { FuncionarioRepository } from "./funcionarios.repository";
import { Funcionario } from "./schemas/funcionario.schema";

@Injectable()
export class FuncionarioService{
    constructor(private readonly funcionarioRepository: FuncionarioRepository){}

    async getUserbyId(id: Number): Promise<Funcionario>{
        return this.funcionarioRepository.findOne({id})
    }
    async getUsers(): Promise<Funcionario[]>{
        return this.funcionarioRepository.find({});
        // return []
    }

    async createUser(id: Number,nome: String, email: String, senha: String): Promise<Funcionario>{
        return this.funcionarioRepository.create({
            id,
            nome,
            email,
            senha
        })
    }
    async updateUser(id: Number, funcionarioUpdate: UpdateFuncionarioDto): Promise<Funcionario>{
        return this.funcionarioRepository.findOneAndUpdate({id}, funcionarioUpdate);
    }
}