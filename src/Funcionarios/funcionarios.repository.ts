import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Funcionario, FuncionarioDocument } from "./schemas/funcionario.schema";


@Injectable()
export class FuncionarioRepository{
    constructor(@InjectModel(Funcionario.name) private FuncionarioModel: Model<FuncionarioDocument>){}

    async findOne(funcionarioFilterQuery: FilterQuery<Funcionario>): Promise<Funcionario>{
        return this.FuncionarioModel.findOne(funcionarioFilterQuery)
    }
    async find(funcionarioFilterQuery: FilterQuery<Funcionario>): Promise<Funcionario[]>{
        return this.FuncionarioModel.find(funcionarioFilterQuery)
    }
    async create(funcionario: Funcionario): Promise<Funcionario>{
        const novofuncionario = new this.FuncionarioModel(funcionario);
        return novofuncionario.save()
    }

    async findOneAndUpdate(funcionarioFilterQuery: FilterQuery<Funcionario>, funcionario: Partial<Funcionario>): Promise<Funcionario>{
        return this.FuncionarioModel.findOneAndUpdate(funcionarioFilterQuery, funcionario);
    }
}