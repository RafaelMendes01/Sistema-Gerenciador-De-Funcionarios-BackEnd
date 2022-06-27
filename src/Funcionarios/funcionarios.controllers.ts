import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateFuncionarioDto } from "./dto/create.funcionario.dto";
import { UpdateFuncionarioDto } from "./dto/update.funcionario.dto";
import { FuncionarioService } from "./funcionario.service";
import { Funcionario, FuncionarioModel } from "./schemas/funcionario.schema";

@Controller('funcionarios')
export class FuncionariosController{
    constructor(private readonly funcionariosService: FuncionarioService){}

    @Get('/:id')
    async getUser(@Param('id') id:string): Promise<Funcionario>{
        return this.funcionariosService.getUserbyId(id);
    }
    @Get('/')
    async getUsers(): Promise<Funcionario[]>{
        return this.funcionariosService.getUsers();
    }
    @Post()
    async createUser(@Body() createFuncionario: CreateFuncionarioDto): Promise<FuncionarioModel>{
        return this.funcionariosService.createUser(createFuncionario.nome, createFuncionario.email, createFuncionario.senha)
    }
    @Patch('/:id')
    async updateUser(@Param('id') id:String, @Body() updateFuncionario: UpdateFuncionarioDto): Promise<FuncionarioModel>{
        return this.funcionariosService.updateUser(id, updateFuncionario);
    }
    @Delete('/:id')
    async deleteUser(@Param('id') id:string){
        return this.funcionariosService.deleteUser(id);
    }
}

