import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ApiProperty, ApiTags } from "@nestjs/swagger";

export interface FuncionarioModel {
    nome: String;
    email: String; 
    senha?: String;
} 

export type FuncionarioDocument = Funcionario & Document

@Schema()
@ApiTags('Funcionarios')
export class Funcionario implements FuncionarioModel {
    @Prop()
    @ApiProperty()
    nome: String
    @Prop()
    @ApiProperty()
    email: String
    @Prop()
    @ApiProperty()
    senha: String
}

export const funcionarioSchema = SchemaFactory.createForClass(Funcionario);
