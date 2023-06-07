import { Controller } from '@nestjs/common';
import { CommentLikesService } from './comment_likes.service';

@Controller('comment-likes')
export class CommentLikesController {
  constructor(private readonly commentLikesService: CommentLikesService) {}
}
