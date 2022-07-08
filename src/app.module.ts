import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FuncionariosModule } from './Funcionarios/funcionarios.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-guards';
import { RolesGuard } from './auth/guards/roles-guard';

@Module({
  imports: [MongooseModule.forRoot('mongodb://root:root@localhost:27017/db-funcionarios?authSource=admin'), FuncionariosModule, AuthModule],
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
