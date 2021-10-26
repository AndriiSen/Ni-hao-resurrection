import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

const dotenv = require('dotenv').config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
