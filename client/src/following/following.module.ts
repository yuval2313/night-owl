import { Module } from '@nestjs/common';
import { FollowingService } from './following.service';
import { FollowingController } from './following.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Following } from './models/following.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Following])],
  controllers: [FollowingController],
  providers: [FollowingService],
})
export class FollowingModule {}
