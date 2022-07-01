import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateFuncionarioDto } from "./dto/create.funcionario.dto";
import { UpdateFuncionarioDto } from "./dto/update.funcionario.dto";
import { FuncionarioService } from "./funcionario.service";
import { Funcionario, FuncionarioModel } from "./schemas/funcionario.schema";

@Controller('funcionarios')
export class FuncionariosController{
    constructor(private readonly funcionariosService: FuncionarioService){}

    @Get('/:email')
    async getUser(@Param('email') email:string): Promise<Funcionario>{
        return this.funcionariosService.getUserbyEmail(email);
    }
    @Get('/')
    async getUsers(): Promise<Funcionario[]>{
        return this.funcionariosService.getUsers();
    }
    @Post()
    async createUser(@Body() createFuncionario: CreateFuncionarioDto): Promise<FuncionarioModel>{
        return this.funcionariosService.createUser(createFuncionario.nome, createFuncionario.email, createFuncionario.senha)
    }
    @Patch('/:email')
    async updateUser(@Param('email') email:string, @Body() updateFuncionario: UpdateFuncionarioDto): Promise<FuncionarioModel>{
        return this.funcionariosService.updateUser(email, updateFuncionario);
    }
    @Delete('/:email')
    async deleteUser(@Param('email') email:string){
        return this.funcionariosService.deleteUser(email);
    }
}

