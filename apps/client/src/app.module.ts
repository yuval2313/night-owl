import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { LoggerModule } from 'nestjs-pino';
import { ProfilesModule } from './profiles/profiles.module';
import { FollowsModule } from './follows/follows.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { PhotosModule } from './photos/photos.module';
import { PostPhotosModule } from './post_photos/post_photos.module';
import { PostLikesModule } from './post_likes/post_likes.module';
import { CommentLikesModule } from './comment_likes/comment_likes.module';
import { BusinessesModule } from './businesses/businesses.module';
<<<<<<< Updated upstream
import { SkillsModule } from './skills/skills.module';
=======
import { RouterModule } from '@nestjs/core';
import { pinoLoggerConfiguration } from '@app/shared/config/pino-logger/config';
>>>>>>> Stashed changes

@Module({
  imports: [
    LoggerModule.forRoot(pinoLoggerConfiguration),
    TypeOrmModule.forRoot(dataSourceOptions),
    ProfilesModule,
    FollowsModule,
    PostsModule,
    CommentsModule,
    PhotosModule,
    PostPhotosModule,
    PostLikesModule,
    CommentLikesModule,
    BusinessesModule,
    SkillsModule,
  ],
})
export class AppModule {}
