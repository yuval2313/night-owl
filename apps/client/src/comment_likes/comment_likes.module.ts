import { Module } from '@nestjs/common';
import { CommentLikesService } from './comment_likes.service';
import { CommentLikesController } from './comment_likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentLike } from './models/comment_like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentLike])],
  controllers: [CommentLikesController],
  providers: [CommentLikesService],
})
export class CommentLikesModule {}
