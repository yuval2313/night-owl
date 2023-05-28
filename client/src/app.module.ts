import { Module } from '@nestjs/common';
import { ProfilesModule } from './profiles/profiles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ProfilesModule],
})
export class AppModule {}
