import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FuncionariosModule } from './Funcionarios/funcionarios.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-guards';
import { RolesGuard } from './auth/guards/roles-guard';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://root:root@db:27017/admin?authSource=admin'), FuncionariosModule, AuthModule, SocketModule],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard
  }
],
})
export class AppModule {}
