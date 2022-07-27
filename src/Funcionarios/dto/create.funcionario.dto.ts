import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Role } from "../../enum/role-enum";

export class CreateFuncionarioDto {
    @ApiProperty({
        description: 'nome do funcionario da aplicação',
        example: 'Rafael Mendes'
    })
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
    @ApiProperty({
        description: 'email do funcionario da aplicação',
        example: 'rafael.tallos@gmail.com'
    })
    @IsNotEmpty({
        message: 'email é obrigatorio'
    })
    @IsEmail({
        message: 'e necessario inserir um email valido'
    })
    email: string;
    @ApiProperty({
        description: 'senha do usuario da aplicação',
        example: 'senha123456#%@aaa'
    })
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
    @ApiProperty({
        description: 'cargo do funcionario da aplicação',
        example: 'admin ou user'
    })
    @IsNotEmpty({
        message: 'role é obrigatoria'
    })
    role: Role;
}