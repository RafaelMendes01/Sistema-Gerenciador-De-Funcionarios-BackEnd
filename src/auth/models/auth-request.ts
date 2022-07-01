import { Request } from "express";
import { Funcionario } from "src/Funcionarios/schemas/funcionario.schema";
export interface authRequest extends Request{
    user: Funcionario;
}