import { config } from 'dotenv';
config();

import { AppModule } from './app.module';
import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  const port = +configService.get<number>('PORT');
  await app.listen(port);
}
bootstrap();
