import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

export interface FuncionarioModel {
    nome: String;
    email: String; 
    senha?: String;
} 

export type FuncionarioDocument = Funcionario & Document

@Schema()
export class Funcionario implements FuncionarioModel {
    @Prop()
    nome: String
    @Prop()
    email: String
    @Prop()
    senha: String
}

export const funcionarioSchema = SchemaFactory.createForClass(Funcionario);
