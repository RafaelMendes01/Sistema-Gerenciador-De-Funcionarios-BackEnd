import { Module } from '@nestjs/common';
import { FuncionariosModule } from 'src/Funcionarios/funcionarios.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local-strategy';

@Module({
  imports: [FuncionariosModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
