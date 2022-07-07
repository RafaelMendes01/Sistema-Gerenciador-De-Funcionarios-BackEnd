import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FuncionariosModule } from 'src/Funcionarios/funcionarios.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/roles-guard';
import { LoginValidationMiddleware } from './middlewares/login-validation-middleware';
import { JwtStrategy } from './strategy/jwt-strategy';
import { LocalStrategy } from './strategy/local-strategy';

@Module({
  imports: [FuncionariosModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: '300d'}
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RolesGuard]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
