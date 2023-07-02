import { config } from 'dotenv';
config();

import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('POSTGRES_HOST_AUTH_API'),
  port: configService.get('POSTGRES_PORT_AUTH_API'),
  username: configService.get('POSTGRES_USER_AUTH_API'),
  password: configService.get('POSTGRES_PASSWORD_AUTH_API'),
  database: configService.get('POSTGRES_DB_AUTH_API'),
  entities: ['dist/apps/auth/**/*.entity.js'],
  migrations: ['dist/apps/auth/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
