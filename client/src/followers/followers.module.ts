import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Followers } from './models/followers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Followers])],
  controllers: [FollowersController],
  providers: [FollowersService],
})
export class FollowersModule {}
