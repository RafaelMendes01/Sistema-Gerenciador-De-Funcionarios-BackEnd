import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    exceptionFactory: (erros)=> new BadRequestException(erros)
  }))
  const config = new DocumentBuilder()
    .setTitle('Funcionarios back-end')
    .setDescription('esse e o swagger da minha api de funcionarios')
    .setVersion('1.0')
    .addTag('Funcionarios')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
