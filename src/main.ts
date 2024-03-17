import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { initialize } from './initialize';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as  version from './version.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    { logger: ['error', 'warn', 'debug'] }
  );

  app.useGlobalPipes(new ValidationPipe(
    { whitelist: true }
  ))

  initialize()

  // ****************Swagger****************
  const options = new DocumentBuilder()
    .setVersion(version.version)
    .setTitle('Foto Trap Test Api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger', app, document);
  // ****************Swagger****************

  await app.listen(8080);
}
bootstrap();
