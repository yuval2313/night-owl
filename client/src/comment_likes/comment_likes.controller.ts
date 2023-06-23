import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentLikesService } from './comment_likes.service';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CApiBearerAuth } from '../decorators/custom-api-bearer-auth.decorator';
import { CommentLike } from './models/comment_like.entity';

@ApiTags('comment_likes')
@CApiBearerAuth()
@Controller('comments/:commentId')
export class CommentLikesController {
  constructor(private readonly commentLikesService: CommentLikesService) {}

  @ApiOperation({ summary: 'This route likes a comment' })
  @ApiParam({ type: String, name: 'commentId', description: 'Comment id' })
  @ApiCreatedResponse({
    type: CommentLike,
    description: 'Successfully liked a comment',
  })
  @ApiNotFoundResponse({ description: 'Not Found: Could not find comment' })
  @Post('like')
  likeComment(@Param('commentId') commentId: string): void {}

  @ApiOperation({
    summary: 'This route unlikes a comment',
    description: 'Soft deletes a comment_like entity',
  })
  @ApiParam({ type: String, name: 'commentId', description: 'Comment id' })
  @ApiOkResponse({
    type: CommentLike,
    description: 'Successfully unliked a comment',
  })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find comment',
  })
  @Delete('unlike')
  unlikeComment(@Param('commentId') commentId: string): void {}

  @ApiOperation({ summary: "This route gets a comment's likes" })
  @ApiParam({ type: String, name: 'commentId', description: 'Comment id' })
  @ApiOkResponse({
    type: [CommentLike],
    description: 'Successfully retrieved comment likes',
  })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find comment',
  })
  @Get('likes')
  getCommentLikes(@Param('commentId') commentId: string): void {}
}
