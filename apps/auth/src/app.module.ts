import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { LoggerModule } from 'nestjs-pino';
import { pinoLoggerConfiguration } from '@app/shared/config/pino-logger/config';

@Module({
  imports: [
    LoggerModule.forRoot(pinoLoggerConfiguration),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
