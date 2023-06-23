import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { Profile } from './models/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowsModule } from './follows/follows.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), FollowsModule],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
