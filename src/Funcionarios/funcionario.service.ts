import { Injectable } from "@nestjs/common";
import e from "cors";
import { Role } from "src/enum/role-enum";
import { SocketGateway } from "src/socket/socket.gateway";
import { encodePassWord } from "src/utils/bcrypt";
import { UpdateFuncionarioDto } from "./dto/update.funcionario.dto";
import { FuncionarioRepository } from "./funcionarios.repository";
import { Funcionario, FuncionarioModel } from "./schemas/funcionario.schema";

@Injectable()
export class FuncionarioService {
    constructor(private readonly funcionarioRepository: FuncionarioRepository,
        private readonly socketGateway: SocketGateway,) { }

    async getUserbyEmail(email: string): Promise<Funcionario> {

        return this.funcionarioRepository.findOne({ email })
    }
    async getUsers(): Promise<Funcionario[]> {
        return this.funcionarioRepository.find({});
    }

    async createUser(nome: string, email: string, senha: string, role: Role): Promise<string> {
        return this.funcionarioRepository.create({
            nome,
            email,
            senha: await encodePassWord(senha),
            role
        }).then((res) => {
            this.socketGateway.emitnewUser(email);
            return email;
        })

    }
    async updateUser(email: string, funcionarioUpdate: UpdateFuncionarioDto): Promise<string> {
        funcionarioUpdate.senha = await encodePassWord(funcionarioUpdate.senha);
        return this.funcionarioRepository.findOneAndUpdate({ email }, funcionarioUpdate).then((res) => {
            this.socketGateway.emitupdateUser(email);
            return email;
        })
    }
    async deleteUser(email: string) {
        return this.funcionarioRepository.deleteOne({ email }).then((res) => {
            this.socketGateway.emitRemoveUser(email);
            return email;
        })
    }
}