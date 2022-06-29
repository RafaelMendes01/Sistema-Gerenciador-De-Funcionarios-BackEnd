import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FuncionariosModule } from './Funcionarios/funcionarios.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://root:root@localhost:27017/db-funcionarios?authSource=admin'), FuncionariosModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
