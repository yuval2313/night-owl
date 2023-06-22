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

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({
          context: 'HTTP',
        }),
        customLogLevel: (_, res) => {
          if (res.statusCode >= 400 && res.statusCode < 500) return 'error';
          if (res.statusCode >= 500 && res.statusCode < 600) return 'fatal';
        },
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            colorize: true,
            levelFirst: true,
          },
        },
      },
    }),
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
  ],
})
export class AppModule {}
