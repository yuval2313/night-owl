import { config } from 'dotenv';
config();

import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { HttpExceptionFilter } from '@app/shared/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = app.get(Logger);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useLogger(logger);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  const config = new DocumentBuilder()
    .setTitle('clientApi')
    .setDescription('clientApi microservice for NightOwl')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      name: 'Access Token',
      description: 'Access token authentication',
      bearerFormat: 'JWT',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = +configService.get<number>('PORT_CLIENT_API');
  await app.listen(port);
}
bootstrap();
