import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SocketGateway } from "../socket/socket.gateway";
import { FuncionarioService } from "./funcionario.service";
import { FuncionariosController } from "./funcionarios.controllers";
import { FuncionarioRepository } from "./funcionarios.repository";
import { Funcionario, funcionarioSchema } from "./schemas/funcionario.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: Funcionario.name, schema: funcionarioSchema}])],
    controllers: [ FuncionariosController],
    providers: [FuncionarioService, FuncionarioRepository, SocketGateway],
    exports: [FuncionarioService,]
})

export class FuncionariosModule{}