import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { LoggerModule } from 'nestjs-pino';
import { ProfilesModule } from './profiles/profiles.module';
import { FollowsModule } from './profiles/follows/follows.module';
import { PostsModule } from './posts/posts.module';
import { PostLikesModule } from './posts/post_likes/post_likes.module';
import { PostPhotosModule } from './posts/post_photos/post_photos.module';
import { CommentsModule } from './posts/comments/comments.module';
import { CommentLikesModule } from './posts/comments/comment_likes/comment_likes.module';
import { PhotosModule } from './photos/photos.module';
import { BusinessesModule } from './businesses/businesses.module';
import { RouterModule } from '@nestjs/core';

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
    PostsModule,
    PhotosModule,
    BusinessesModule,
    RouterModule.register([
      {
        path: 'profiles',
        module: ProfilesModule,
        children: [{ path: '/:profileId', module: FollowsModule }],
      },
      {
        path: 'posts',
        module: PostsModule,
        children: [
          { path: '/:postId', module: PostPhotosModule },
          { path: '/:postId', module: PostLikesModule },
          {
            path: '/:postId/comments',
            module: CommentsModule,
            children: [{ path: '/:commentId', module: CommentLikesModule }],
          },
        ],
      },
    ]),
  ],
})
export class AppModule {}
