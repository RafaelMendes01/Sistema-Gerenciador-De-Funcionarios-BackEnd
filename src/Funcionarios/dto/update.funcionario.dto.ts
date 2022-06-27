import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateFuncionarioDto {
    @Expose({
        name: 'userName'
    })
    @IsNotEmpty({
        message: 'nome é obrigatorio'
    })
    @IsString({
        message: 'nome precisa ser do tipo String'
    })
    nome: String;
    @IsNotEmpty({
        message: 'email é obrigatorio'
    })
    @IsEmail({
        message: 'e necessario inserir um email valido'
    })
    email: String;
    @Expose({
        name: 'passWord'
    })
    @IsNotEmpty({
        message: 'senha é obrigatoria'
    })
    @IsString({
        message: 'senha precisa ser do tipo String'
    })
    senha: String;
}