import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Funcionario, FuncionarioDocument, FuncionarioModel } from "./schemas/funcionario.schema";


@Injectable()
export class FuncionarioRepository {
    constructor(@InjectModel(Funcionario.name) private FuncionarioModel: Model<FuncionarioDocument>) { }

    async findOne(funcionarioFilterQuery: FilterQuery<Funcionario>): Promise<Funcionario> {
        return this.FuncionarioModel.findOne(funcionarioFilterQuery)
    }
    async find(funcionarioFilterQuery: FilterQuery<Funcionario>): Promise<Funcionario[]> {
        return this.FuncionarioModel.find(funcionarioFilterQuery)
    }
    async create(funcionario: Funcionario): Promise<FuncionarioModel> {
        const novofuncionario = await this.FuncionarioModel.create(funcionario);

        return { email: novofuncionario.email, nome: novofuncionario.nome, role: novofuncionario.role };
    }

    async findOneAndUpdate(funcionarioFilterQuery: FilterQuery<Funcionario>, funcionario: Partial<Funcionario>): Promise<FuncionarioModel> {
        const atualizafuncionario = await this.FuncionarioModel.findOneAndUpdate(funcionarioFilterQuery, funcionario);

        return { nome: atualizafuncionario.nome, email: atualizafuncionario.email, role: atualizafuncionario.role };
    }
    async deleteOne(funcionarioFilterQuery: FilterQuery<Funcionario>) {
        return this.FuncionarioModel.deleteOne(funcionarioFilterQuery);

    }
}