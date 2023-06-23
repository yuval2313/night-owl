import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentLikesService } from './comment_likes.service';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CApiBearerAuth } from '../../../decorators/custom-api-bearer-auth.decorator';
import { CommentLike } from './models/comment_like.entity';

@ApiTags('comment_likes')
@CApiBearerAuth()
@Controller()
export class CommentLikesController {
  constructor(private readonly commentLikesService: CommentLikesService) {}

  @ApiOperation({ summary: 'This route likes a comment' })
  @ApiParam({ type: String, name: 'commentId', description: 'Comment id' })
  @ApiCreatedResponse({
    type: CommentLike,
    description: 'Successfully liked a comment',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiNotFoundResponse({ description: 'Not Found: Could not find comment' })
  @ApiConflictResponse({
    description: 'Conflict: Comment has already been liked',
  })
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
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find comment / comment like',
  })
  @Delete('unlike')
  unlikeComment(@Param('commentId') commentId: string): void {}

  @ApiOperation({
    summary: 'This route relikes a comment',
    description: 'Removes soft delete from a comment_like entity',
  })
  @ApiParam({ type: String, name: 'commentId', description: 'Comment id' })
  @ApiOkResponse({
    type: CommentLike,
    description: 'Successfully reliked a comment',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiNotFoundResponse({
    description:
      'Not Found: Could not find comment / soft deleted comment like',
  })
  @Patch('relike')
  relikeComment(@Param('commentId') commentId: string): void {}

  @ApiOperation({ summary: "This route gets a comment's likes" })
  @ApiParam({ type: String, name: 'commentId', description: 'Comment id' })
  @ApiOkResponse({
    type: [CommentLike],
    description: 'Successfully retrieved comment likes',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Validation error',
  })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find comment / comment likes',
  })
  @Get('likes')
  getCommentLikes(@Param('commentId') commentId: string): void {}
}
