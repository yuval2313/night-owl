import { config } from 'dotenv';
config();

import { AppModule } from './app.module';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { HttpExceptionFilter } from '@app/shared/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('authApi')
    .setDescription('authApi microservice for NightOwl')
    .addBearerAuth(
      {
        name: 'Access token authentication',
        type: 'http',
        scheme: 'Bearer',
        description: 'Access token authentication',
        bearerFormat: 'JWT',
      },
      'access',
    )
    .addBearerAuth(
      {
        name: 'Refresh token authentication',
        type: 'http',
        scheme: 'Bearer',
        description: 'Refresh token authentication',
        bearerFormat: 'JWT',
      },
      'refresh',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = +configService.get<number>('PORT_AUTH_API');
  await app.listen(port);
}
bootstrap();
