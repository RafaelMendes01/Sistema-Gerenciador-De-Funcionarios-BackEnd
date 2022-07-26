import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Role } from "../../enum/role-enum";

export class CreateFuncionarioDto {
    @Expose({
        name: 'username'
    })
    @IsNotEmpty({
        message: 'nome é obrigatorio'
    })
    @IsString({
        message: 'nome precisa ser do tipo String'
    })
    nome: string;
    @IsNotEmpty({
        message: 'email é obrigatorio'
    })
    @IsEmail({
        message: 'e necessario inserir um email valido'
    })
    email: string;
    @Expose({
        name: 'password'
    })
    @IsNotEmpty({
        message: 'senha é obrigatoria'
    })
    @IsString({
        message: 'senha precisa ser do tipo String'
    })
    senha: string;
    @IsNotEmpty({
        message: 'role é obrigatoria'
    })
    role: Role;
}