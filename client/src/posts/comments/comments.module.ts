import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './models/comment.entity';
import { CommentLikesModule } from './comment_likes/comment_likes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), CommentLikesModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
