import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = +configService.get<number>('PORT');
  await app.listen(port);
}
bootstrap();
