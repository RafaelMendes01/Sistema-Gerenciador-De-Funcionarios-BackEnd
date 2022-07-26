import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Role } from "../../enum/role-enum";

export interface FuncionarioModel {
    nome: string;
    email: string;
    senha?: string;
    role: Role;
}

export type FuncionarioDocument = Funcionario & Document

@Schema()
@ApiTags('Funcionarios')
export class Funcionario implements FuncionarioModel {
    @Prop()
    @ApiProperty()
    nome: string
    @Prop({
        unique: true,

    })
    @ApiProperty()
    email: string
    @Prop()
    @ApiProperty()
    senha: string

    @Prop()
    @ApiProperty()
    role: Role;

    constructor(user?: Partial<Funcionario>) {
        this.nome = user?.nome;
        this.email = user?.email;
        this.senha = user?.senha;
        this.role = user?.role;
    }
}

export const funcionarioSchema = SchemaFactory.createForClass(Funcionario);
