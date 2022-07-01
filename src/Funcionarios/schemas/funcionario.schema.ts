import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ApiProperty, ApiTags } from "@nestjs/swagger";

export interface FuncionarioModel {
    nome: string;
    email: string; 
    senha?: string;
} 

export type FuncionarioDocument = Funcionario & Document

@Schema()
@ApiTags('Funcionarios')
export class Funcionario implements FuncionarioModel {
    @Prop()
    @ApiProperty()
    nome: string
    @Prop()
    @ApiProperty()
    email: string
    @Prop()
    @ApiProperty()
    senha: string
}

export const funcionarioSchema = SchemaFactory.createForClass(Funcionario);
