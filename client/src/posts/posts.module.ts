import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './models/post.entity';
import { CommentsModule } from './comments/comments.module';
import { PostLikesModule } from './post_likes/post_likes.module';
import { PostPhotosModule } from './post_photos/post_photos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    CommentsModule,
    PostLikesModule,
    PostPhotosModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
