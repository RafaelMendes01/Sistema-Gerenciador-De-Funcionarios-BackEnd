import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FuncionariosModule } from 'src/Funcionarios/funcionarios.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local-strategy';

@Module({
  imports: [FuncionariosModule, JwtModule.register({
    secret: 'tallos123',
    signOptions: {expiresIn: '300d'}
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
