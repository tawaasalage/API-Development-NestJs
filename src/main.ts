import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  // Set up Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API documentation for NestJS application')
    .setVersion('1.0')
    .addBearerAuth()  // If you're using JWT authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);


  app.useGlobalPipes(new ValidationPipe()); // add validation globally
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
