import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  app.enableCors({
    origin: process.env.CORS_URL,
    credentials: true
  });

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
