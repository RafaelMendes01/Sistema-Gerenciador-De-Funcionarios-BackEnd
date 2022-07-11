import { Injectable } from "@nestjs/common";
import { Role } from "src/enum/role-enum";
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

    async createUser(nome: string, email: string, senha: string, role: Role): Promise<FuncionarioModel>{
        return this.funcionarioRepository.create({
            nome,
            email,
            senha: await encodePassWord(senha),
            role
        })
    }
    async updateUser(email: string, funcionarioUpdate: UpdateFuncionarioDto): Promise<FuncionarioModel>{
        funcionarioUpdate.senha = await encodePassWord(funcionarioUpdate.senha);
        return this.funcionarioRepository.findOneAndUpdate({email}, funcionarioUpdate);
    }
    async deleteUser(email: string){
        return this.funcionarioRepository.deleteOne({email})
    }
}