import { config } from 'dotenv';
config();

import { AppModule } from './app.module';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { HttpExceptionFilter } from './filters/http-exception.filter';

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const reflector = app.get(Reflector);
  const logger = app.get(Logger);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useLogger(logger);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new LoggerErrorInterceptor(),
  );

  const port = +configService.get<number>('PORT');
  await app.listen(port);
}
bootstrap();
