import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { FuncionarioService } from '../src/Funcionarios/funcionario.service';
import { JwtAuthGuard } from '../src/auth/guards/jwt-guards';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../src/auth/guards/roles-guard';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [FuncionarioService,{
        provide: APP_GUARD,
        useClass: JwtAuthGuard
  },
      {
        provide: APP_GUARD,
        useClass: RolesGuard
    }]
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

it('/ (GET)', () => {
  return request(app.getHttpServer())
    .get('/')
    .expect(200)
    .expect('Hello World!');
});
});
