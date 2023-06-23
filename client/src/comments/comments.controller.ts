import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CApiBearerAuth } from '../decorators/custom-api-bearer-auth.decorator';
import { Comment } from './models/comment.entity';
import { CreateCommentDto } from './req-dtos/create-comment.dto';
import { UpdateCommentDto } from './req-dtos/update-comment.dto';

@ApiTags('comments')
@CApiBearerAuth()
@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'This route creates a comment on a post' })
  @ApiParam({ type: String, name: 'postId', description: 'Post id' })
  @ApiCreatedResponse({
    type: Comment,
    description: 'Successfully created a comment',
  })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error' })
  @ApiNotFoundResponse({ description: 'Not Found: Could not find post' })
  @Post()
  createComment(
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ): void {}

  @ApiOperation({ summary: 'This route updates a comment' })
  @ApiParam({ type: String, name: 'postId', description: 'Post id' })
  @ApiParam({ type: String, name: 'commentId', description: 'Comment id' })
  @ApiOkResponse({
    type: Comment,
    description: 'Successfully updated the comment',
  })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Not authorized to perform this action',
  })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find comment',
  })
  @Patch('/:commentId')
  editComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): void {}

  @ApiOperation({ summary: 'This route removes a comment' })
  @ApiParam({ type: String, name: 'postId', description: 'Post id' })
  @ApiParam({ type: String, name: 'commentId', description: 'Comment id' })
  @ApiOkResponse({
    type: Comment,
    description: 'Successfully removed the comment',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Not authorized to perform this action',
  })
  @ApiNotFoundResponse({
    description: 'Not Found: Could not find comment',
  })
  @Delete('/:commentId')
  removeComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ): void {}

  @ApiOperation({ summary: "This route gets a post's comments" })
  @ApiParam({ type: String, name: 'postId', description: 'Post id' })
  @ApiOkResponse({
    type: [Comment],
    description: "Successfully retrieved given post's comments",
  })
  @ApiNotFoundResponse({ description: 'Not Found: Could not find comments' })
  @Get()
  getPostComments(@Param('postId') postId: string): void {}

  @ApiOperation({ summary: "This route gets a given post's comment" })
  @ApiParam({ type: String, name: 'postId', description: 'Post id' })
  @ApiParam({ type: String, name: 'commentId', description: 'Comment id' })
  @ApiOkResponse({
    type: Comment,
    description: 'Successfully retrieved comment',
  })
  @ApiNotFoundResponse({ description: 'Not Found: Could not find comment' })
  @Get('/:commentId')
  getPostComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ): void {}
}
