import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { IsPublic } from "../auth/decorators/is-public-decorator";
import { Roles } from "../auth/decorators/roles-decorator";
import { Role } from "../enum/role-enum";
import { CreateFuncionarioDto } from "./dto/create.funcionario.dto";
import { UpdateFuncionarioDto } from "./dto/update.funcionario.dto";
import { FuncionarioService } from "./funcionario.service";
import { Funcionario, FuncionarioModel } from "./schemas/funcionario.schema";

@Controller('funcionarios')
export class FuncionariosController{
    constructor(private readonly funcionariosService: FuncionarioService){}
    
    @Roles(Role.ADMIN)
    @Get('/:email')
    async getUser(@Param('email') email:string): Promise<Funcionario>{
        return this.funcionariosService.getUserbyEmail(email);
    }
    @Roles(Role.ADMIN)
    @Get('/')
    async getUsers(): Promise<Funcionario[]>{
        return this.funcionariosService.getUsers();
    }
    @Roles(Role.ADMIN)
    @Post()
    async createUser(@Body() createFuncionario: CreateFuncionarioDto): Promise<string>{
        return await this.funcionariosService.createUser(createFuncionario.nome, createFuncionario.email, createFuncionario.senha, createFuncionario.role)
    }
    @Roles(Role.ADMIN)
    @Patch('/:email')
    async updateUser(@Param('email') email:string, @Body() updateFuncionario: UpdateFuncionarioDto): Promise<string>{
        return this.funcionariosService.updateUser(email, updateFuncionario);
    }
    @Roles(Role.ADMIN)
    @Delete('/:email')
    async deleteUser(@Param('email') email:string){
        return this.funcionariosService.deleteUser(email);
    }
}

