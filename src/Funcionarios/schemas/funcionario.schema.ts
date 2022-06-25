import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export type FuncionarioDocument = Funcionario & Document

@Schema()
export class Funcionario {
    @Prop()
    nome: String
    @Prop()
    email: String
    @Prop()
    senha: String
}

export const funcionarioSchema = SchemaFactory.createForClass(Funcionario);
