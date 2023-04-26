import { config } from 'dotenv';
config();

import { AppModule } from './app.module';
import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const reflector = app.get(Reflector);
  const logger = app.get(Logger);

  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new LoggerErrorInterceptor(),
  );

  const port = +configService.get<number>('PORT');
  await app.listen(port);
}
bootstrap();
