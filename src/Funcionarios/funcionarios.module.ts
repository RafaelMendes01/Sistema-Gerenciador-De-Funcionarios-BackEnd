import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FuncionarioService } from "./funcionario.service";
import { FuncionariosController } from "./funcionarios.controllers";
import { FuncionarioRepository } from "./funcionarios.repository";
import { Funcionario, funcionarioSchema } from "./schemas/funcionario.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: Funcionario.name, schema: funcionarioSchema}])],
    controllers: [ FuncionariosController],
    providers: [FuncionarioService, FuncionarioRepository],
    exports: [FuncionarioService,]
})

export class FuncionariosModule{}