import { config } from 'dotenv';
config();

import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('POSTGRES_HOST_CLIENT_API'),
  port: configService.get('POSTGRES_PORT_CLIENT_API'),
  username: configService.get('POSTGRES_USER_CLIENT_API'),
  password: configService.get('POSTGRES_PASSWORD_CLIENT_API'),
  database: configService.get('POSTGRES_DB_CLIENT_API'),
  entities: ['dist/apps/client/**/*.entity.js'],
  migrations: ['dist/apps/client/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
